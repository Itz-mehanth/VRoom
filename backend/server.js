const express = require('express');
const http = require('http');
const { ExpressPeerServer } = require('peer');
const { v4: uuidV4 } = require('uuid');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);

// Track users in rooms
const rooms = new Map();

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
  res.send('VRoom WebRTC + Socket.io Backend is running 🚀');
});

io.on('connection', socket => {
  console.log('New socket connection:', socket.id);

  socket.on('join-room', (roomId, userId, userName) => {
    socket.join(roomId);
    
    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, {
        users: new Map(),
        messages: []
      });
      console.log(`Created new room: ${roomId}`);
    }
    
    // Add user to room
    rooms.get(roomId).users.set(userId, {
      id: userId,
      name: userName || `User ${userId.slice(0, 5)}`,
    });
    
    // Log new user and current room state
    console.log(`User joined - Room: ${roomId}`);
    console.log(`User details - ID: ${userId}, Name: ${userName}`);
    console.log('Current users in room:', Array.from(rooms.get(roomId).users.values()));
    
    // Send chat history to new user
    socket.emit('chat-history', rooms.get(roomId).messages);
    
    // Emit updated user list to all clients in the room
    const usersInRoom = Array.from(rooms.get(roomId).users.values());
    io.to(roomId).emit('room-users', usersInRoom);
    
    // Notify others that user joined
    socket.to(roomId).emit('user-connected', userId);
    
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
        const disconnectedUser = rooms.get(roomId).users.get(userId);
        rooms.get(roomId).users.delete(userId);
        
        console.log(`User disconnected - Room: ${roomId}`);
        console.log(`Disconnected user: ${disconnectedUser?.name} (${userId})`);
        
        // Send system message about user leaving
        const leaveMessage = {
          id: uuidV4(),
          type: 'system',
          content: `${userName} left the room`,
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
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
