const { INTERNAL_ERROR_RES_MSG } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? INTERNAL_ERROR_RES_MSG
      : message,
  });
};

module.exports = errorHandler;
