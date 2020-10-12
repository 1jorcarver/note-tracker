// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');

// Initialize Express
const PORT = process.env.PORT || 3001;
const app = express();

// Parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Functions
// Create note
function createNewNote(body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
};

// Validate note
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    if (!note.id || typeof note.id !== 'string') {
      return false;
    }
    return true;
};

// Routes
// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

// POST route
app.post('/api/notes', (req, res) => {
    // set ID based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 404 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    // add note to json file & notes array in this function
    const note = createNewNote(req.body, notes);
    res.json(req.body);
    }
});


// Listener
app.listen(PORT, () => {
    console.log(`You are listening to Port #${PORT}`);
})