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

// Routes
app.get("/api/notes", (req, res) => {
    res.json(notes);
})


// Listener
app.listen(PORT, () => {
    console.log(`You are listening to Port #${PORT}`);
})