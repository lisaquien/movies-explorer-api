const movieRouter = require('express').Router();
const { getAllMovies, addNewMovie, unsaveMovie } = require('../controllers/movies');

movieRouter.get('/', getAllMovies);

movieRouter.post('/', addNewMovie);

movieRouter.delete('/:id', unsaveMovie);

module.exports = movieRouter;
