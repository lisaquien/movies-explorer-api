const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { AUTH_NEEDED_RES_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(AUTH_NEEDED_RES_MSG));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'keep-me-safe');
  } catch (err) {
    return next(new UnauthorizedError(AUTH_NEEDED_RES_MSG));
  }

  req.user = payload;

  next();
};

module.exports = auth;
