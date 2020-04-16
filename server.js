const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const path = require('path');
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
  console.log(`listening on ${port}`);
});
