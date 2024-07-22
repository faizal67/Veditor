const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const { handleSocketConnection } = require('./sockets/socketHandlers');
const db = require('./db/dbConn');
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: ['http://localhost:5173', 'https://veditor.onrender.com', 'http://localhost:4173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);

const io = new Server(server, {
  cors: corsOptions,
});

io.on('connection', (socket) => handleSocketConnection(socket, io));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
