const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 150,
  message: 'Количество запросов превышено, попробуйте повторить запрос позднее',
});

module.exports = limiter;
