const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title !== title);
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log('New Note Added')
    } else {
        console.log('Duplicate note found')
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const remainingNotes = notes.filter(note => note.title !== title);
    if(notes.length > remainingNotes.length){
        saveNotes(remainingNotes);
        console.log(chalk.green.bold.inverse('Notes Removed!'))
    } else {
        console.log(chalk.red.bold.inverse('No Notes Found!'))
    }
}

const listNotes = () => {
    console.log(chalk.green.bold.inverse('Your Notes!'));
    const notes = loadNotes();
    notes.forEach(note => {
        console.log('Notes title:',note.title);
    });
}

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if(note){
        console.log(chalk.inverse('Note title:',note.title));
        console.log('Note body:',note.body);
    } else {
        console.log(chalk.red.inverse('No note found'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}