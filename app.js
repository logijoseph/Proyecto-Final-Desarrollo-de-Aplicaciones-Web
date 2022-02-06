const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
let cookieParser = require("cookie-parser")
//Esto será para los mensajes de error
let flash = require("connect-flash")
let session = require("express-session")

dotenv.config();

const app = express();

// connection to db

mongoose.connect(process.env.MONGODB)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/routeindex');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser()); //Con esto el servidor debería ser capaz de reconocer cookies
app.use(express.static('public'));
//Estas dos líneas será para lo de mensaje de erro
app.use(flash())
app.use(session({
    secret: 'mysecret',
    resave: false, 
    saveUninitialized: false
}))

// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
})