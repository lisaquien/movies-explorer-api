const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/errorHandler');
const wrongPath = require('./middlewares/wrongPath');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { PORT = 3005 } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL);

app.use(requestLogger);

app.use(limiter);

app.use(router);

app.use(wrongPath);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`ok ${PORT}`);
});
