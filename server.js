// {========== Include External Modules  ==========}
const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/index.js');

// {========== Initialization ==========}
const app = express();
const PORT = process.env.PORT || 3001;


// {========== Middleware ==========}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set Static Folder
app.use(express.static('public'));
app.use('/api', api);

// {========== Route ==========}
// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);