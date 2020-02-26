const express = require('express');
const morgan = require('morgan');

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(require('./routes/takss.routes'));

module.exports = app;