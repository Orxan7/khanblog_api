const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const { connection } = require("./database/dbConnection");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/auth/', authRouter);

connection.sync()
    .then(()=>{
        console.log('Synced db')
        const association = require("./database/association");
    })
    .catch(err=>{
        console.log("Failed to sync db: " + err.message);
    })

module.exports = app;
