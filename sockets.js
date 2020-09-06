const uniqid = require('uniqid');
const sockets = new Map();

const list = () => sockets;

const add = socket => {
    const id = uniqid.time();
    socket.id = id;
    sockets.set(id, socket);
    return socket;
}

const remove = socket => {
    sockets.delete(socket.id);
}

const sendAll = data => {
    const message = JSON.stringify(data);
    sockets.forEach(socket => socket.send(message));
}

const sendExclude = (ids, data) => {
    const message = JSON.stringify(data);
    if (!Array.isArray(ids)) ids = [ids];
    sockets.forEach(socket => {
        if(!ids.includes(socket.id)) socket.send(message);
    })
}

module.exports = {
    list,
    add,
    remove,
    sendAll,
    sendExclude,
}