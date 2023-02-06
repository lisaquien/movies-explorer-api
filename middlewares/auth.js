const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пожалуйста, авторизуйтесь'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'keep-me-safe');
  } catch (err) {
    return next(new UnauthorizedError('Пожалуйста, авторизуйтесь'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
