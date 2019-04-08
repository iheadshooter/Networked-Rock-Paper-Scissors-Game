'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');

const RPS = require('./rps-game');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

var waitingPlayer;

io.on('connection', onConnection);

app.use(express.static(__dirname + "/client"));

server.listen(8080, () => console.log("Ready to work!"));

function onConnection(sock) {
    sock.emit('msg', "Welcome to the Game");
    sock.on('msg', (txt) => io.emit('msg', txt));
    if (waitingPlayer) {
        new RPS(waitingPlayer, sock);
        waitingPlayer = null;
    } else {
        sock.emit('msg', "You are waiting for the other player");
        waitingPlayer = sock;
    }
}