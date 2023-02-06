const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const wrongPath = require('./middlewares/wrongPath');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT = 3005,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
  message: 'Количество запросов превышено, попробуйте повторить запрос позднее',
});

app.use(limiter);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL);

app.use(requestLogger);

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

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ok ${PORT}`);
});
