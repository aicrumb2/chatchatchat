const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const fs = require('fs');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
//     fs.writeFile('log.txt', "\n"+msg, { flag: 'a+' }, err => {})
  });

  socket.on('orange', msg => {
    io.emit('orange', msg);
//     fs.writeFile('log.txt', "\n"+msg, { flag: 'a+' }, err => {})
  });

  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});
