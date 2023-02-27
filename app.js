require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./models/connection')

const indexRouter = require('./routes/index');
const cartRouter = require('./routes/cart');
const bookingsRouter = require('./routes/bookings');

const app = express();

const cors = require('cors');
app.use(cors({ "Access-Control-Allow-Origin": "https://ouioui-front.vercel.app/" }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/bookings', bookingsRouter);

module.exports = app;
