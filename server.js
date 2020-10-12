// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Express
const PORT = process.env.PORT || 3001;
const app = express();

// Parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



// Listener
app.listen(PORT, () => {
    console.log(`You are listening to Port #${PORT}`);
})