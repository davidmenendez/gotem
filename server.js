const fs = require('fs');
const path = require('path');

// socket setup
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const soundPath = path.join(__dirname, 'public', 'sounds');
const sounds = () => fs.readdirSync(soundPath).map(file => file.split('.').shift());

app.use(express.static(path.join(__dirname, 'build')));
app.get('/api/sounds', (req, res) => {
  res.json(sounds());
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', socket => {
  console.log('user has connected');
  socket.on('join', id => {
    socket.join(id);
    socket.to(id).emit('userJoined');
  });
  socket.on('soundRequest', data => {
    const { sound, id } = data;
    socket.to(id).emit('soundReceived', sound);
  });
  socket.on('disconnect', () => {
    console.log('user has DISCONNECTED');
  });
});

server.listen(port, () => {
  console.log(`active on ${port}`);
});
