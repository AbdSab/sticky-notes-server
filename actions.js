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
    sockets.sendExclude(id, {
        type: 'notes.delete',
        data: data.id,
    });
    if(notes.list().length === 0) {
        const note = notes.create();
        sockets.sendAll({
            type: 'notes.new',
            data: note,
        })
    }
});

actions.on('notes.add', (id, data) => {
    if(notes.list().length > 20) return;
    const note = notes.create();
    sockets.sendAll({
        type: 'notes.new',
        data: note,
    })
});

module.exports = actions;