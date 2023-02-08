const userRouter = require('express').Router();
const { celebrate } = require('celebrate');

const {
  signupValidation,
  signinValidation,
  updateInfoValidation,
} = require('../middlewares/fieldValidation');
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
  getMyInfo,
  updateMyInfo,
} = require('../controllers/users');

userRouter.post('/signup', celebrate(signupValidation), createUser);
userRouter.post('/signin', celebrate(signinValidation), login);

userRouter.get('/users/me', auth, getMyInfo);

userRouter.patch('/users/me', auth, celebrate(updateInfoValidation), updateMyInfo);

module.exports = userRouter;
