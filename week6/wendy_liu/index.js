const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let username = "User" + Math.floor(Math.random() * 1000);
  users.push(username);
  io.emit('update users', users);
  io.emit('user connected', `${username} has joined the chat.`);
  
  socket.username = username;
  socket.on('chat message', (msg) => {
    io.emit('chat message', { username: socket.username, message: msg }); 
  });

  socket.on('typing', () => {
    socket.broadcast.emit('display typing', socket.username); 
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('hide typing');
  });

  socket.on('disconnect', () => {
    users = users.filter(user => user !== socket.username);
    io.emit('update users', users);
    io.emit('user disconnected', `${socket.username} has left the chat.`);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
