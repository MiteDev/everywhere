const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

const userRouter = require('./routes/user');
const noticeRouter = require('./routes/notice');
const tourRouter = require('./routes/tour');
const festiRouter = require('./routes/festi');
const pensionRouter = require('./routes/pension');

const options = require('./config/dbOptions');

require('dotenv').config();

const sessionStore = new MySQLStore(options);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '5mb'}));

app.use(cookieParser(process.env.MYKEY));

app.use(session({
    secret : process.env.MYKEY,
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../')));

app.use('/', userRouter);
app.use('/', noticeRouter);
app.use('/', tourRouter);
app.use('/', festiRouter);
app.use('/', pensionRouter);

module.exports = app;