import {
  PORT
} from './config';

import express from 'express';

import http from 'http';
import io from 'socket.io';

var app = express();
const server = http.createServer(app);
const socketIO = io(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

socketIO.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    console.log('msg received: ', msg);
    socketIO.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
