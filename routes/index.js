const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

router.use('/', userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
