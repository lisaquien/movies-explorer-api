const mongoose = require('mongoose');

const { urlRegex, rusRegex, engRegex } = require('../utils/regex');
const {
  WRONG_URL_FORMAT_RES_MSG,
  CYRILLIC_ONLY_RES_MSG,
  LATIN_ONLY_RES_MSG,
} = require('../utils/constants');

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
      message: WRONG_URL_FORMAT_RES_MSG,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: WRONG_URL_FORMAT_RES_MSG,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: WRONG_URL_FORMAT_RES_MSG,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => rusRegex.test(v),
      message: CYRILLIC_ONLY_RES_MSG,
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => engRegex.test(v),
      message: LATIN_ONLY_RES_MSG,
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
