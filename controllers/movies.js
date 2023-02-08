const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  OK_CODE,
  CREATED_CODE,
  INCORRECT_DATA_RES_MSG,
  MOVIE_NOT_FOUND_RES_MSG,
  SAVED_MOVIES_NOT_FOUND_RES_MSG,
  DIFF_OWNER_RES_MSG,
} = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .orFail()
    .then((savedMovies) => res.status(OK_CODE).send(savedMovies))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(SAVED_MOVIES_NOT_FOUND_RES_MSG));
      } else {
        next(err);
      }
    });
};

const addNewMovie = (req, res, next) => {
  const userId = req.user._id;

  Movie.create({ owner: userId, ...req.body })
    .then((addedMovie) => res.status(CREATED_CODE).send(addedMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(INCORRECT_DATA_RES_MSG));
      } else {
        next(err);
      }
    });
};

const unsaveMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  Movie.findById({ _id: id })
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(MOVIE_NOT_FOUND_RES_MSG));
      } else if (String(movie.owner) !== userId) {
        next(new ForbiddenError(DIFF_OWNER_RES_MSG));
      } else {
        Movie.findByIdAndRemove({ _id: id })
          .then((unsavedMovie) => res.status(200).send(unsavedMovie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INCORRECT_DATA_RES_MSG));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies,
  addNewMovie,
  unsaveMovie,
};
