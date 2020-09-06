const { EventEmitter } = require('events');
const sockets = require('./sockets');
const notes = require('./notes');

const actions = new EventEmitter();

actions.on('notes.update', (id, data) => {
    notes.update(data);
    sockets.sendExclude(id, {
        type: 'notes.update',
        data,
    });
});

actions.on('notes.delete', (id, data) => {
    notes.remove(data);
    console.log(notes.list());
    sockets.sendExclude(id, {
        type: 'notes.delete',
        data,
    });
});

actions.on('notes.add', (id, data) => {
    const note = notes.create();
    sockets.sendAll({
        type: 'notes.new',
        data: note,
    })
});

module.exports = actions;