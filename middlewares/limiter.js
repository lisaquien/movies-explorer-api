const rateLimit = require('express-rate-limit');

const { TOO_MANY_REQUESTS_RES_MSG } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
  message: TOO_MANY_REQUESTS_RES_MSG,
});

module.exports = limiter;
