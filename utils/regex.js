const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/;
const rusRegex = /[а-яё0-9\s]/;
const engRegex = /[\w\s]/;

module.exports = {
  urlRegex,
  rusRegex,
  engRegex,
};
