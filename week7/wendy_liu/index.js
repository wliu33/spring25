const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  username: String,
  content: String,
});

const Message = mongoose.model("Message", messageSchema);

let users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async (socket) => {
  let username = "User" + Math.floor(Math.random() * 1000);
  socket.username = username;
  users.push(username);

  io.emit('update users', users);
  io.emit('user connected', `${username} has joined the chat.`);

  const messages = await Message.find({});
  messages.forEach(msg => {
    socket.emit('chat message', { username: msg.username, message: msg.content });
  });

  socket.on('chat message', async function(msg) {
    console.log(`Message received: ${socket.username}: ${msg}`);

    const message = new Message({ username: socket.username, content: msg });
    await message.save();
    
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

server.listen(3000, async function() {
  await mongoose.connect("mongodb://wendyliu033:5oUneGEhQdieWJcA@cluster0-shard-00-00.otwt0.mongodb.net:27017,cluster0-shard-00-01.otwt0.mongodb.net:27017,cluster0-shard-00-02.otwt0.mongodb.net:27017/?replicaSet=atlas-kqtlx6-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
  console.log('listening on *:3000');
});
