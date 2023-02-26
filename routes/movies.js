const movieRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  newMovieValidation,
  userIdValidation,
} = require('../middlewares/fieldValidation');

const {
  getSavedMovies,
  addNewMovie,
  unsaveMovie,
} = require('../controllers/movies');

movieRouter.get('/', getSavedMovies);

movieRouter.post('/', celebrate(newMovieValidation), addNewMovie);

movieRouter.delete('/:id', celebrate(userIdValidation), unsaveMovie);

module.exports = movieRouter;
