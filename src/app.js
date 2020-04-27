const express = require('express');
const morgan = require('morgan');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(require('./routes/takss.routes'));

module.exports = app;