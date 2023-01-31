const notes = require('express').Router();

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.send("hello");
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);
  res.send("hi");
});

module.exports = notes;
