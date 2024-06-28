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
// let documentContent = new QuillDelta(); // Initialize with empty Delta

const documents = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle request for current document content
  socket.on('requestDocument', (documentId) => {
    if (documents[documentId]) {
      socket.join(documentId);
      socket.emit('document', documents[documentId]);
    }
    else {
      socket.emit('error', 'Document not found');
    }
  });

  socket.on('newDocument', (documentId, newContent) => {
    console.log('new Document :',newContent)
    const newDocument = new QuillDelta(newContent.delta);
    documents[documentId] = newDocument;
    // io.to(documentId).emit('document', newDocument);  //broadcast to every one 
  });


  socket.on('change', (documentId, delta) => {
    console.log('changes received:',delta)
    if (documents[documentId]) {
      const deltaObj = new QuillDelta(delta);
      documents[documentId] = documents[documentId].compose(deltaObj);
      socket.to(documentId).emit('change', delta);
    }
  });

  // socket.on('saveDocument', (content) => {
  //   console.log('Saving document:', content);
  //   fs.writeFileSync(path.join(__dirname, 'document.json'), JSON.stringify(content));
  // });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
