const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(methodOverride('_method'));

app.get('/', (req, res) => { res.render('index'); });
app.get('/yurts', (req, res) => { res.render('yurts'); });
app.get('/reservations', (req, res) => { res.render('reservations'); });
app.get('/activities', (req, res) => { res.render('activities'); });

app.use('/reservations', require('./controllers/contact.js'));

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        // Connect the DB first before starting the server
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        });
    } catch (err) {
        console.log(err);
        console.log('Error connecting to the MongoDB database');
    }
};

start();
