const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('orange', msg => {
    io.emit('orange', msg); // i know there's a way to do this with just chat message but idfk how and im lazy
  });

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // THE GAME STUFF
  socket.on('position', (data) => {
    socket.broadcast.emit('position', data);
  });
});

http.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});
