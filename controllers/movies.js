const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  OK_CODE,
  CREATED_CODE,
} = require('../utils/constants');

const getSavedMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .orFail()
    .then((savedMovies) => res.status(OK_CODE).send(savedMovies))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('У пользователя нет сохраненных фильмов'));
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
        next(new BadRequestError('Данные вводятся некорректно'));
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
        next(new NotFoundError('Запрашиваемый фильм не найден'));
      } else if (String(movie.owner) !== userId) {
        next(new ForbiddenError('Невозможно удалить фильм, сохраненный другим пользователем'));
      } else {
        Movie.findByIdAndRemove({ _id: id })
          .then((unsavedMovie) => res.status(200).send(unsavedMovie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Данные вводятся некорректно'));
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
