const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
// Load config

dotenv.config({
    path: './config/config.env'
});

// Start the mongodb connection
connectDb();

// Initialize App
const app = express();

// Settings for handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Static files access configuration
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'));

// Logging

if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening in ${process.env.NODE_ENV} mode on PORT ${PORT}!!!`);
})