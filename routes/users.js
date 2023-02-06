const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMyInfo, updateMyInfo } = require('../controllers/users');

userRouter.get('/me', getMyInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateMyInfo);

module.exports = userRouter;
