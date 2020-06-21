const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
// Load config

dotenv.config({
    path: './config/config.env'
});

// Start the mongodb connection
connectDb();

// Initialize App
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening in ${process.env.NODE_ENV} mode on PORT ${PORT}!!!`);
})