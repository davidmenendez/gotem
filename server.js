const fs = require('fs');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;
const path = require('path');
const soundPath = path.join(__dirname, 'public', 'sounds');
const sounds = () => fs.readdirSync(soundPath).map(file => file.split('.').shift());

app.get('/api/sounds', (req, res) => {
  res.json(sounds());
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
