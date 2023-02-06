const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getSavedMovies, addNewMovie, unsaveMovie } = require('../controllers/movies');
const { urlRegex, rusRegex, engRegex } = require('../utils/regex');

movieRouter.get('/', getSavedMovies);

movieRouter.post('/', celebrate({
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
    movieId: Joi.string().required(),
  }),
}), addNewMovie);

movieRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }).unknown(true),
}), unsaveMovie);

module.exports = movieRouter;
