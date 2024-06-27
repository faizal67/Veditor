const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const QuillDelta = require('quill-delta');

const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173','http://192.168.20.104:5173'], // Vite app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // if you need to pass cookies with CORS requests
  },
});

const corsOptions = {
  origin: ['http://localhost:5173','http://192.168.20.104:5173'], // Vite app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

// let documentContent = ''; // Simple in-memory document storage for example
let documentContent = new QuillDelta(); // Initialize with empty Delta

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle request for current document content
  socket.on('requestDocument', () => {
    socket.emit('document', documentContent);
  });

  socket.on('newDocument', (newContent) => {
    console.log('new content rec:', newContent)
    const deltaObj = new QuillDelta(newContent);
    documentContent = deltaObj;
    socket.broadcast.emit('document', documentContent); // Broadcast new document content to all clients
  });

  // Listen for changes from the client
  // socket.on('change', (delta) => {
  //   console.log('data received', delta);
  //   documentContent = delta; // Adjust this based on your delta format
  //   socket.broadcast.emit('change', delta); // Broadcast change to all other clients
  // });

  socket.on('change', (delta) => {
    console.log('data received:', delta);
    const deltaObj = new QuillDelta(delta);
    // console.log('previous data:',documentContent)
    // console.log('deltaObj:',deltaObj);
    documentContent = documentContent.compose(deltaObj); // Compose the changes
    socket.broadcast.emit('change', delta); // Broadcast change to all other clients
  });


  socket.on('saveDocument', (content) => {
    console.log('Saving document:', content);
    fs.writeFileSync(path.join(__dirname, 'document.json'), JSON.stringify(content));
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
