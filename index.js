const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// valid rooms are 0, 1, 2, 3

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  socket.on('chat message', data => {
    io.emit('chat message', data);
  });

  socket.on('orange', data => {
    io.emit('orange', data); // i know there's a way to do this with just chat message but idfk how and im lazy
  });

});

http.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});
