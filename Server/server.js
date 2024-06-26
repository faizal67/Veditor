const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Vite app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you need to pass cookies with CORS requests
  },
});

const corsOptions = {
  origin: 'http://localhost:5173', // Vite app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

let documentContent = ''; // Simple in-memory document storage for example

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle request for current document content
  socket.on('requestDocument', () => {
    socket.emit('document', documentContent);
  });

  socket.on('newDocument', (newContent) => {
    console.log('new content rec:', newContent)
    documentContent = newContent;
    socket.broadcast.emit('document', documentContent); // Broadcast new document content to all clients
  });

  // Listen for changes from the client
  socket.on('change', (delta) => {
    console.log('data received', delta);
    documentContent += delta; // Adjust this based on your delta format
    socket.broadcast.emit('change', delta); // Broadcast change to all other clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
