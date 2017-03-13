'use strict'

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(__dirname + '/client'));
var port = Number(process.env.PORT || 8080);
server.listen(port, () => console.log('Ready to work!.'));

require('./lib/easycard');

var myGame = easyCard.initNewGame();

io.on('connection', onConnection);

function onConnection(socket) {
  myGame.addPlayer(socket);
  socket.emit('updatechat', 'servidor', 'Hello EasyCard.js!');
};
