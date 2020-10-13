// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require("./db/db.json");

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
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ notes: noteArray }, null, 2)
    );
    return note;
};

// Validate note
function validateNewNote(note) {
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

// Delete note
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        if (id === notesArray[i].id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, "./db/db.json"),
                JSON.stringify({ notes: notesArray }, null, 2)
            );
        }
    }
    return false;
};

// Routes
// GET route
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

// POST route
app.post("/api/notes", (req, res) => {
    // set ID based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 404 error back
    if (!validateNewNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    // add note to json file & notes array in this function
    const note = createNewNote(req.body, notes)
    res.json(req.body);
    }
});

// route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// route to serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// route to delete note
app.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(notes);
})

// Listener
app.listen(PORT, () => {
    console.log(`You are listening to Port #${PORT}`);
})