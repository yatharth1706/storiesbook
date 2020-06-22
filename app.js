const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');

// Load config
dotenv.config({
    path: './config/config.env'
});

// Passport configuration
require('./config/passport')(passport);

// Start the mongodb connection
connectDb();

// Initialize App
const app = express();

// body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Handlebar helpers
const { formatDate } = require('./helpers/hbs')


// Settings for handlebars
app.engine('.hbs', exphbs({ helpers: {formatDate,} ,defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection : mongoose.connection })
  }))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static files access configuration
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

// Logging

if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening in ${process.env.NODE_ENV} mode on PORT ${PORT}!!!`);
})