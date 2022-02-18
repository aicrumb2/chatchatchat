const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  socket.on('chat message', data => {
    io.emit('chat message', data);
  });
  // positions
  socket.on('position', data => {
    io.emit('position', data);
  });

});

http.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});
