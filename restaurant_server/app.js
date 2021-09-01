var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {AppError} = require('./utilities/customeErrors')
const myLogger = require('./logger/index')

var indexRouter = require('./routes/index');
const orders = require('./routes/orders')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/orders', orders)



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    myLogger.error(err, err.status)
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
 })

module.exports = app;
