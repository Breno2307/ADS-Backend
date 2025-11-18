require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');

const apidocsRouter = require('./routes/apidocsRouter');
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', apidocsRouter);
app.use('/usuarios', usuariosRouter);

module.exports = app;