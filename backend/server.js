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
  origin: true, // Reflect request origin to allow any LAN IP
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Upgrade", "Connection"]
}));

// ... (middleware) ...

// Create Peer server
const peerServer = ExpressPeerServer(server, {
  debug: !isProduction,
  proxied: true,
  path: '/',
  key: 'peerjs',
  corsOptions: {
    origin: true, // Allow any origin for PeerJS too
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ... (peerjs middleware) ...

const io = socketIO(server, {
  cors: {
    origin: true, // Allow any origin for Socket.IO
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Upgrade", "Connection"]
  },
  // ...
});

// ...

io.on('connection', socket => {
  console.log('New socket connection:', socket.id);

  socket.on('join-room', (roomId, userId, userName) => {
    // Store user info in socket data
    socket.data.roomId = roomId;
    socket.data.userId = userId;
    socket.data.userName = userName;

    socket.join(roomId);

    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: new Map(),
        messages: []
      });
    }

    const room = rooms.get(roomId);

    // Add user to room
    room.users.set(userId, {
      userId,
      name: userName,
      socketId: socket.id
    });

    // Broadcast to others that a user connected
    socket.to(roomId).emit('user-connected', userId, userName);

    // Send existing users to the new user
    // Convert Map values to Array
    const usersList = Array.from(room.users.values());
    socket.emit('room-users', usersList);

    // Send chat history
    socket.emit('chat-history', room.messages);

    // Send system message
    const joinMessage = {
      id: uuidV4(),
      type: 'system',
      content: `${userName} joined the room`,
      timestamp: new Date().toISOString(),
      userId: 'system'
    };
    room.messages.push(joinMessage);
    // Broadcast the system message to everyone including sender
    io.to(roomId).emit('chat-message', joinMessage);
  });

  // Handle chat messages - MOVED OUTSIDE join-room to prevent duplicates
  socket.on('send-message', (data) => {
    // We need to know which room/user this socket belongs to
    // We stored roomId in socket.data.roomId
    // But we need userId/userName.

    // Ideally, we should store user info in socket.data too.
    // For now, let's look it up or trust the client (if we passed it).
    // Wait, the original code used closure for userId/userName.
    // If we move it out, we lose closure.
    // Better approach: Store user info in socket.data.

    const roomId = socket.data.roomId;
    const userId = socket.data.userId;
    const userName = socket.data.userName;

    if (roomId && rooms.has(roomId)) {
      const message = data; // Assuming data is the message content string

      const newMessage = {
        id: uuidV4(),
        type: 'user',
        content: message,
        timestamp: new Date().toISOString(),
        userId: userId || 'unknown',
        userName: userName || 'Unknown'
      };

      rooms.get(roomId).messages.push(newMessage);
      if (rooms.get(roomId).messages.length > 100) {
        rooms.get(roomId).messages.shift();
      }
      io.to(roomId).emit('chat-message', newMessage);
    }
  });

  // ...
});
socket.on('disconnect', () => {
  // Retrieve roomId from socket data since we are outside the closure
  const roomId = socket.data.roomId;

  // Remove user from room
  if (roomId && rooms.has(roomId)) {
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

      // Notify others
      socket.to(roomId).emit('user-disconnected', { userId: disconnectedUserId, userName: disconnectedUser.name });
    } else {
      // Fallback if user not found but room exists
      socket.to(roomId).emit('user-disconnected', { userId: 'unknown', userName: 'Unknown User' });
    }
  }



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
