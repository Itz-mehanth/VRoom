const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { ExpressPeerServer } = require('peer');
const { v4: uuidV4 } = require('uuid');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

// Get environment variables
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://localhost:5173';
const isProduction = process.env.NODE_ENV === 'production';
const WEBSOCKET_TIMEOUT = parseInt(process.env.WEBSOCKET_TIMEOUT) || 3000;
const WEBSOCKET_PING_INTERVAL = parseInt(process.env.WEBSOCKET_PING_INTERVAL) || 3000;

// Enable CORS
app.use(cors({
  origin: [FRONTEND_URL, "https://localhost:5173", "https://vrroom.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Upgrade", "Connection"]
}));

// Add headers middleware
app.use((req, res, next) => {
  res.setHeader('Upgrade', 'websocket');
  res.setHeader('Connection', 'Upgrade');
  next();
});

// Create server based on environment
let server;
if (isProduction) {
  server = require('http').createServer(app);
} else {
  // Read SSL certificates for development
  const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert/cert.pem'))
  };
  server = https.createServer(sslOptions, app);
}

// Track users in rooms
const rooms = new Map();

// Create Peer server
const peerServer = ExpressPeerServer(server, {
  debug: !isProduction,
  proxied: true,
  path: '/',
  key: 'peerjs',
  corsOptions: {
    origin: [FRONTEND_URL, "https://localhost:5173", "https://vrroom.netlify.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Use PeerJS server
app.use('/peerjs', peerServer);

const io = socketIO(server, {
  cors: {
    origin: [FRONTEND_URL, "https://localhost:5173", "https://vrroom.netlify.app"],
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Upgrade", "Connection"]
  },
  transports: ['websocket', 'polling'],
  pingTimeout: WEBSOCKET_TIMEOUT,
  pingInterval: WEBSOCKET_PING_INTERVAL,
  upgradeTimeout: WEBSOCKET_TIMEOUT,
  allowUpgrades: true,
  perMessageDeflate: false
});

// Add proxy configuration
app.enable('trust proxy');
app.set('trust proxy', 1);

io.on('connection', socket => {
  console.log('New socket connection:', socket.id);

  socket.on('join-room', (roomId, userId, userName) => {
    console.log(`Socket ${socket.id} joining room ${roomId} as ${userName}`);
    socket.join(roomId);
    // Store roomId in socket data
    socket.data.roomId = roomId;
    console.log(`Stored roomId ${roomId} in socket data`);
    
    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: new Map(),
        messages: []
      });
      console.log(`Created new room: ${roomId}`);
    }
    
    // Add user to room
    const usersMap = rooms.get(roomId).users;
    
    // Remove any existing entries for this user (by userName or socketId)
    for (const [existingId, existingUser] of usersMap.entries()) {
      if (existingUser.name === userName || existingUser.socketId === socket.id) {
        console.log(`Removing existing user entry - Name: ${existingUser.name}, ID: ${existingId}`);
        usersMap.delete(existingId);
      }
    }

    // Add user to room with proper initial position
    usersMap.set(userId, {
      id: userId,
      socketId: socket.id,  // Store the socket ID
      name: userName || `User ${userId.slice(0, 5)}`,
      position: { x: 0, y: 2, z: 0 }, // Set y to 2 to match VRScene initial height
      isWalking: false // Initialize isWalking state
    });
    
    // Log new user and current room state
    console.log(`User joined - Room: ${roomId}`);
    console.log(`User details - ID: ${userId}, SocketID: ${socket.id}, Name: ${userName}`);
    console.log('Current users in room:', Array.from(rooms.get(roomId).users.values()));
    
    // Send chat history to new user
    socket.emit('chat-history', rooms.get(roomId).messages);
    
    // Emit updated user list to all clients in the room
    const usersInRoom = Array.from(rooms.get(roomId).users.values());
    io.to(roomId).emit('room-users', usersInRoom);
    
    // Notify others that user joined
    console.log(`Notifying others that user joined - Room: ${roomId}`);
    socket.to(roomId).emit('user-connected', userId);
    console.log(`Notified others that user joined - Room: ${roomId}`);

    // Send system message about user joining
    const joinMessage = {
      id: uuidV4(),
      type: 'system',
      content: `${userName} joined the room`,
      timestamp: new Date().toISOString(),
      userId: 'system'
    };
    rooms.get(roomId).messages.push(joinMessage);
    io.to(roomId).emit('chat-message', joinMessage);

    // Handle chat messages
    socket.on('send-message', (message) => {
      const newMessage = {
        id: uuidV4(),
        type: 'user',
        content: message,
        timestamp: new Date().toISOString(),
        userId: userId,
        userName: userName
      };
      
      if (rooms.has(roomId)) {
        rooms.get(roomId).messages.push(newMessage);
        // Keep only last 100 messages
        if (rooms.get(roomId).messages.length > 100) {
          rooms.get(roomId).messages.shift();
        }
        io.to(roomId).emit('chat-message', newMessage);
      }
    });

    socket.on('disconnect', () => {
      // Remove user from room
      if (rooms.has(roomId)) {
        // Find user by socket ID
        let disconnectedUser = null;
        let disconnectedUserId = null;
        
        for (const [userId, user] of rooms.get(roomId).users.entries()) {
          if (user.socketId === socket.id) {
            disconnectedUser = user;
            disconnectedUserId = userId;
            break;
          }
        }
        
        if (disconnectedUser) {
          rooms.get(roomId).users.delete(disconnectedUserId);
          
          console.log(`User disconnected - Room: ${roomId}`);
          console.log(`Disconnected user: ${disconnectedUser.name} (${disconnectedUserId})`);
          
          // Send system message about user leaving
          const leaveMessage = {
            id: uuidV4(),
            type: 'system',
            content: `${disconnectedUser.name} left the room`,
            timestamp: new Date().toISOString(),
            userId: 'system'
          };
          rooms.get(roomId).messages.push(leaveMessage);
          io.to(roomId).emit('chat-message', leaveMessage);
          
          // If room is empty, delete it
          if (rooms.get(roomId).users.size === 0) {
            rooms.delete(roomId);
            console.log(`Room ${roomId} deleted - no users remaining`);
          } else {
            // Update user list for remaining users
            const updatedUsers = Array.from(rooms.get(roomId).users.values());
            console.log('Remaining users in room:', updatedUsers);
            io.to(roomId).emit('room-users', updatedUsers);
          }
        }
        
        socket.to(roomId).emit('user-disconnected', disconnectedUserId);
      }
    });
  });

  // Handle position updates - moved outside join-room
  socket.on('update-transform', (data) => {
    console.log('Received position update:', data);
    
    // Use the stored roomId from socket data
    const roomId = socket.data.roomId;
    console.log('Room ID from socket data:', roomId);
    
    if (!roomId) {
      console.log('No room ID found for this socket');
      return;
    }

    if (rooms.has(roomId)) {
      // Find the user in the room
      const room = rooms.get(roomId);
      const userEntry = Array.from(room.users.entries())
        .find(([_, user]) => user.name === data.userName);
      
      if (userEntry) {
        const [userId, user] = userEntry;
        if (user) {
          user.position = data.position;
          user.rotation = data.rotation;
          console.log(`User movement - Room: ${roomId}, User: ${user.name}`);
          console.log(`New position - x: ${data.position.x.toFixed(2)}, y: ${data.position.y.toFixed(2)}, z: ${data.position.z.toFixed(2)}`);
          console.log(`New rotation - x: ${data.rotation.x.toFixed(2)}, y: ${data.rotation.y.toFixed(2)}, z: ${data.rotation.z.toFixed(2)}`);
          console.log(`Is walking: ${data.isWalking}`);
          
          // Broadcast the updated position to all users in the room
          io.to(roomId).emit('user-transform', {
            userName: data.userName,
            position: data.position,
            rotation: data.rotation,
            isWalking: data.isWalking
          });
        }
      }
    }
  });
});


server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
});
