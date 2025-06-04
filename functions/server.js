const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Setup Socket.IO
const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store room data
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId, userId, userName) => {
    socket.join(roomId);
    
    // Initialize room if it doesn't exist
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Map());
    }
    
    // Add user to room
    const room = rooms.get(roomId);
    room.set(userId, {
      id: userId,
      name: userName,
      socketId: socket.id
    });
    
    // Broadcast to others in room
    socket.to(roomId).emit('user-connected', userId);
    
    // Send updated user list to all in room
    io.to(roomId).emit('room-users', Array.from(room.values()));

    // Handle chat messages
    socket.on('send-message', (message) => {
      const messageData = {
        id: Date.now(),
        content: message,
        userId: userId,
        userName: userName,
        timestamp: new Date().toISOString()
      };
      io.to(roomId).emit('chat-message', messageData);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        room.delete(userId);
        
        // Remove room if empty
        if (room.size === 0) {
          rooms.delete(roomId);
        } else {
          // Notify others and update user list
          socket.to(roomId).emit('user-disconnected', userId);
          io.to(roomId).emit('room-users', Array.from(room.values()));
        }
      }
    });
  });
});

// Setup PeerJS Server
const peerServer = ExpressPeerServer(app.listen(3001), {
  debug: true,
  path: '/peerjs'
});

app.use('/peerjs', peerServer);

// Handle serverless function
exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'WebSocket server is running' })
    };
  }

  // Handle WebSocket upgrade
  if (event.headers.upgrade?.toLowerCase() === 'websocket') {
    const response = await serverless(app)(event, context);
    return {
      ...response,
      headers: {
        ...response.headers,
        'Content-Type': 'application/json',
        'Connection': 'upgrade',
        'Upgrade': 'websocket'
      }
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: 'Invalid request' })
  };
};

// Export the server instances for testing
module.exports = { io, peerServer }; 