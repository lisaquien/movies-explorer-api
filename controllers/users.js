const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const {
  OK_CODE,
  CREATED_CODE,
  INCORRECT_DATA_RES_MSG,
  DUPLICATE_EMAIL_RES_MSG,
  USER_NOT_FOUND_RES_MSG,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => res.status(CREATED_CODE).send({
      name: newUser.name,
      email: newUser.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_RES_MSG));
      } else if (err.code === 11000) {
        next(new ConflictError(DUPLICATE_EMAIL_RES_MSG));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'keep-me-safe',
        { expiresIn: '7d' },
      );

      res.status(OK_CODE).send({ token });
    })
    .catch(next);
};

const getMyInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById({ _id: userId })
    .orFail()
    .then((myInfo) => res.status(OK_CODE).send({
      name: myInfo.name,
      email: myInfo.email,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INCORRECT_DATA_RES_MSG));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(USER_NOT_FOUND_RES_MSG));
      } else {
        next(err);
      }
    });
};

const updateMyInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    { _id: userId },
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail()
    .then((myUpdInfo) => res.status(OK_CODE).send({
      name: myUpdInfo.name,
      email: myUpdInfo.email,
    }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INCORRECT_DATA_RES_MSG));
      } else if (err.code === 11000) {
        next(new ConflictError(DUPLICATE_EMAIL_RES_MSG));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(USER_NOT_FOUND_RES_MSG));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getMyInfo,
  updateMyInfo,
};
