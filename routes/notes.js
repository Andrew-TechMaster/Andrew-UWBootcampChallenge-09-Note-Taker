// {========== Include External Modules  ==========}
const notes = require('express').Router();
const path = require('path');
const uuid = require('../helpers/uuid');
const FileHandler = require('../helpers/fileHandler');
const fileHandler = new FileHandler();
const filePath = path.join(__dirname, '../db/db.json');

// {========== Route ==========}
// <---------- GET Route for retrieving all the notes ---------->
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    fileHandler.readFromFile(filePath).then((data) => res.json(JSON.parse(data)));
});

// <---------- GET Route for retrieving single note by ID ---------->
notes.get('/:noteId', (req, res) => {
    console.info(`Getting note by id: ${req.params.noteId}`);

    const noteId = req.params.noteId;
    fileHandler.readFromFile(filePath)
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            const responseObj = { status: `Get a single note from db by ID:${noteId}`, data: result };
            return result.length > 0
                ? res.json(responseObj)
                : res.json('No note with that ID');
        });
});

// <---------- POST Route for a new note ---------->
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            id: uuid(),
            title,
            text
        };

        fileHandler.readThenAppend(newNote, filePath);

        const responseObj = { status: `Note added successfully 🚀 with unique ID:${newNote.id}`, data: newNote };
        res.status(201).json(responseObj);
    } else {
        res.status(400).error('Error in adding a note');
    }
});

// <---------- DELETE Route for deleting a note by Id ---------->
notes.delete('/:noteId', (req, res) => {
    console.info(`${req.method} request received to delete a note`);

    const noteId = req.params.noteId;

    fileHandler.readFromFile(filePath)
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notes except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            fileHandler.writeToFile(filePath, result);

            // Respond to the DELETE request
            const responseObj = { status: `Item with ID:${noteId} has been deleted 🗑️`, data: result };
            res.status(200).json(responseObj);
        });
});

// {========== Export ==========}
module.exports = notes;
