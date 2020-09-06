const WebSocket = require('ws');
const actions = require('./actions');
const sockets = require('./sockets');
const notes = require('./notes');

const wss = new WebSocket.Server({
    port: process.env.PORT || 8080,
});

wss.on('connection', socket => {
    const { id } = sockets.add(socket);
    const initData = {
        type: 'init',
        id,
        data: {notes: notes.list()},
    }
    socket.send(JSON.stringify(initData));
    socket.on('message', message => {
        const messageData = JSON.parse(message);
        const {type, id, data} = messageData;
        actions.emit(type, id, data);
    });
    socket.on('close', () => {
        sockets.remove(socket);
    });
});