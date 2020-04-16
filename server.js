const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const server = app.listen(4000);
const io = require('socket.io').listen(server);
const soundPath = path.join(__dirname, 'public', 'sounds');
const sounds = () => fs.readdirSync(soundPath).map(file => file.split('.').shift());

app.use(cors());
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

