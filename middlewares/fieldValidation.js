const { Joi } = require('celebrate');

const { urlRegex, rusRegex, engRegex } = require('../utils/regex');

const signupValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const signinValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const updateInfoValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
};

const newMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(urlRegex)),
    trailerLink: Joi.string().required().pattern(new RegExp(urlRegex)),
    nameRU: Joi.string().required().pattern(new RegExp(rusRegex)),
    nameEN: Joi.string().required().pattern(new RegExp(engRegex)),
    thumbnail: Joi.string().required().pattern(new RegExp(urlRegex)),
    movieId: Joi.number().required(),
  }),
};

const userIdValidation = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }).unknown(true),
};

module.exports = {
  signupValidation,
  signinValidation,
  updateInfoValidation,
  newMovieValidation,
  userIdValidation,
};
