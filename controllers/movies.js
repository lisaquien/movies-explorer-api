const Movie = require('../models/movie');

const getAllMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((savedMovies) => res.status(200).send(savedMovies))
    .catch((err) => res.send({ message: err.message }));
};

const addNewMovie = (req, res, next) => {
  /* const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body; */
  /* const userId = req.user._id; */

  const userId = req.user._id;

  Movie.create({ owner: userId, ...req.body })
    .then((savedMovies) => res.status(200).send(savedMovies))
    .catch((err) => res.send({ message: err.message }));
};

const unsaveMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findByIdAndDelete({ _id: id })
    .then((unsavedMovie) => res.status(200).send(unsavedMovie))
    .catch((err) => res.send({ message: err.message }));
};

module.exports = {
  getAllMovies,
  addNewMovie,
  unsaveMovie,
};
