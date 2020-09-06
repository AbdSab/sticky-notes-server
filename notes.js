const uniqid = require('uniqid');
const notes = [{id:'0', content:'Hello', x:100, y:100, width: 128, height: 128}];

const list = () => notes;

const create = () => {
    const note = {id:uniqid(), content:'Empty note ...', x:10, y:10, width: 128, height: 128}
    notes.push(note);
    return note;
}

const add = note => {
    notes.push(note);
    return notes;
};

const update = data => {
    const index = notes.findIndex(({id}) => id === data.id);
    if(index === -1) return;
    notes[index] = data;
    return notes;
}

const remove = data => {
    const index = notes.findIndex(({id}) => id === data.id);
    if(index === -1) return;
    notes.splice(index, 1);
    return notes;
};

module.exports = {
    list,
    add,
    update,
    remove,
    create,
}