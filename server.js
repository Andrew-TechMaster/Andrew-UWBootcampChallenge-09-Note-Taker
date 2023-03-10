// {========== Include External Modules  ==========}
const express = require('express');
const path = require('path');
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
// <---------- GET Route for homepage ---------->
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// <---------- GET Route for notes page ---------->
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// <---------- Wildcard Route to direct users to a home page ---------->
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// {========== Start Listening ==========}
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);