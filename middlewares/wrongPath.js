const UnauthorizedError = require('../errors/UnauthorizedError');

const wrongPath = (req, res, next) => {
  next(new UnauthorizedError('Страница с таким адресом не существует'));
};

module.exports = wrongPath;
