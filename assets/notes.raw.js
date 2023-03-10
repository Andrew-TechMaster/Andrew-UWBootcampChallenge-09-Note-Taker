// {========== Include External Modules  ==========}
const notes = require('express').Router();
const path = require('path');
// const notesData = require('../db/db.json');
const uuid = require('../helpers/uuid');
const FileHandler = require('../helpers/fileHandler');
const fileHandler = new FileHandler();
const filePath = path.join(__dirname, "../db/db.json");


// {========== Route ==========}
// <---------- GET Route for retrieving all the notes ---------->
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    // res.status(200).json(notesData);
    fileHandler.readFromFile(filePath).then((data) => res.json(JSON.parse(data)));

    // fileHandler.readFromFile(filePath).then((data) => JSON.parse(data))
    //                                   .then((dataObj) => {
    //                                     const responseObj = { status: "Extract all notes from db", body: dataObj };
    //                                     res.status(200).json(responseObj);
    //                                   })


    // fileHandler.readFromFile(filePath).then((data) => {
    //     const dataJson = data;
    //     const dataObj = JSON.parse(dataJson);
    //     const responseObj = { status: "Extract all notes from db", body: dataObj };
    //     res.status(200).json(responseObj);
    // });
});

// <---------- GET Route for retrieving single note by ID ---------->
notes.get('/:noteId', (req, res) => {
    console.info(`Getting note by id: ${req.params.noteId}`);

    const noteId = req.params.noteId;
    fileHandler.readFromFile(filePath)
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No tip with that ID');
        });

    /*
    // const found = notesData.some(n => n.id === parseInt(req.params.noteId));
    const found = notesData.some(n => n.id === req.params.noteId);
    if (found) {
        // const singleNote = notesData.filter(n => n.id === parseInt(req.params.noteId));
        const singleNote = notesData.filter(n => n.id === req.params.noteId);
        res.json(singleNote);
    } else {
        res.status(400).send(`No data found by the given id: ${req.params.noteId}`);
    }
    */
});

// <---------- POST Route for a new note ---------->
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;
    // const newNoteId = parseInt(notesData[notesData.length - 1].id) + 1;
    // const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
    // const newNoteId = parseInt(data[data.length - 1].id) + 1;

    /*
    fs.readFile(filePath, { encoding: 'utf8', flag: 'r' }, (err, data) => {
        const newNoteId = parseInt(data[data.length - 1].id) + 1;

        if (req.body) {
            const newNote = {
                id: newNoteId,
                title,
                text
            };
            fileHandler.readThenAppend(newNote, filePath);
            res.json(`Note added successfully ????`);
        } else {
            res.status(400).error('Error in adding a note');
        }
    });
    */

    if (req.body) {
        const newNote = {
            id: uuid(),
            title,
            text
        };

        fileHandler.readThenAppend(newNote, filePath);
        res.json(`Note added successfully ???? with unique ID: ${newNote.id}`);
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
            res.json(`Item ${noteId} has been deleted ???????`);
        });

    /*
    // const found = notesData.some(n => n.id === parseInt(req.params.noteId));
    const found = notesData.some(n => n.id === req.params.noteId);
    if (found) {
        console.log(`Data with id ${req.params.noteId} has been already deleted`);
        // const remains = notesData.filter(n => n.id !== parseInt(req.params.noteId));
        const remains = notesData.filter(n => n.id !== req.params.noteId);

        fileHandler.writeToFile(filePath, remains);
        res.json(`Notes with id ${req.params.noteId} has been already deleted`);
    } else {
        res.status(400).send(`Data with id ${req.params.noteId} cannot be found`);
    }
    */
});

// {========== Export ==========}
module.exports = notes;
