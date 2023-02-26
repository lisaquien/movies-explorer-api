const UnauthorizedError = require('../errors/UnauthorizedError');

const { PAGE_NOT_FOUND_RES_MSG } = require('../utils/constants');

const wrongPath = (req, res, next) => {
  next(new UnauthorizedError(PAGE_NOT_FOUND_RES_MSG));
};

module.exports = wrongPath;
