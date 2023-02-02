const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '63dbc3e9471fada5ec6ff13c',
  };

  next();
});

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.listen(PORT, () => {
  console.log(`ok ${PORT}`);
});
