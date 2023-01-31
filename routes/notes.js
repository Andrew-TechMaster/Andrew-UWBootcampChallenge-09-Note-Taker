const notes = require('express').Router();
const notesData = require('../db/db.json');
const FileHandler = require('../helpers/fileHandler');
const fileHandler = new FileHandler();

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    res.json(notesData);
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text
        };
        const file = './db/db.json';
        
        fileHandler.readThenAppend(newNote, file);
        res.json(`Note added successfully 🚀`);
    } else {
        res.status(400).error('Error in adding a note');
    }
});

module.exports = notes;
