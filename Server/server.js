const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const { handleSocketConnection } = require('./sockets/socketHandlers');
const db = require('./db/dbConn');
const { CLIENT_URL } = require('./config');
const app = express();
const server = http.createServer(app);

const url = CLIENT_URL;
const io = new Server(server, {
  cors: {
    origin: url ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});


// app.use(express.static('dist'))
app.use(cors());
app.use(express.json());
app.use('/status', (req, res) => {
  res.status(201).json({ message: 'Server is running good' });
});

app.use('/api/auth', authRoutes);
io.on('connection', (socket) => handleSocketConnection(socket, io));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
