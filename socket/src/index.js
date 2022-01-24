const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const playersHandler = require('./handlers/playersHandler');

const app = express();

// Socket configs
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Init port
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Welcome to Gourd crab shrimp fish 🚀');
});

io.on('connection', (socket) => {
  playersHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Socket started on port ${PORT} 🚀`);
});
