const mongoose = require('mongoose');
const { urlRegex, rusRegex, engRegex } = require('../utils/regex');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'URL ссылки имеет некорректный формат',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'URL ссылки имеет некорректный формат',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: 'URL ссылки имеет некорректный формат',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  }, /* — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле. */
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => rusRegex.test(v),
      message: 'URL ссылки имеет некорректный формат',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => engRegex.test(v),
      message: 'URL ссылки имеет некорректный формат',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
