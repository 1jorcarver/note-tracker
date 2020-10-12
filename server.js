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
function createNewNote(body, noteArray) {

}

// Routes
// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

// POST route
app.post('/api/notes', (req, res) => {
    // ID based on what the next index of the array will be
    req.body.id = notes.length.toString();

    res.json(req.body);
})


// Listener
app.listen(PORT, () => {
    console.log(`You are listening to Port #${PORT}`);
})