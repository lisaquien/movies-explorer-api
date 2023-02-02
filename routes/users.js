const userRouter = require('express').Router();
const { createUser, getMyInfo, updateMyInfo } = require('../controllers/users');

userRouter.post('/', createUser);

userRouter.get('/me', getMyInfo);

userRouter.patch('/me', updateMyInfo);

module.exports = userRouter;
