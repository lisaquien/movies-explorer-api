const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
require('dotenv').config();

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const wrongPath = require('./middlewares/wrongPath');

const {
  PORT = 3005,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.use(wrongPath);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ok ${PORT}`);
});
