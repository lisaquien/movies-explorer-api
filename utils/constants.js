const OK_CODE = 200;
const CREATED_CODE = 201;

const INCORRECT_DATA_RES_MSG = 'Данные вводятся некорректно';
const DUPLICATE_EMAIL_RES_MSG = 'Пользователь с таким e-mail уже существует, воспользуйтесь другим';
const USER_NOT_FOUND_RES_MSG = 'Запрашиваемый пользователь не найден';
const MOVIE_NOT_FOUND_RES_MSG = 'Запрашиваемый фильм не найден';
const SAVED_MOVIES_NOT_FOUND_RES_MSG = 'У пользователя нет сохраненных фильмов';
const DIFF_OWNER_RES_MSG = 'Невозможно удалить фильм, сохраненный другим пользователем';
const AUTH_NEEDED_RES_MSG = 'Пожалуйста, авторизуйтесь';
const INTERNAL_ERROR_RES_MSG = 'Произошла внутренняя ошибка сервера, запрос не может быть выполнен';
const TOO_MANY_REQUESTS_RES_MSG = 'Количество запросов превышено, попробуйте повторить запрос позднее';
const PAGE_NOT_FOUND_RES_MSG = 'Страница с таким адресом не существует';
const WRONG_URL_FORMAT_RES_MSG = 'URL ссылки имеет некорректный формат';
const CYRILLIC_ONLY_RES_MSG = 'Данное поле может быть заполнено только кириллицей';
const LATIN_ONLY_RES_MSG = 'Данное поле может быть заполнено только буквами латинского алфавита';
const WRONG_EMAIL_FORMAT_RES_MSG = 'Некорректный формат электронной почты';
const WRONG_PASS_OR_EMIAL_RES_MSG = 'Почта или пароль введены некорректно';

module.exports = {
  OK_CODE,
  CREATED_CODE,
  INCORRECT_DATA_RES_MSG,
  DUPLICATE_EMAIL_RES_MSG,
  USER_NOT_FOUND_RES_MSG,
  MOVIE_NOT_FOUND_RES_MSG,
  SAVED_MOVIES_NOT_FOUND_RES_MSG,
  DIFF_OWNER_RES_MSG,
  AUTH_NEEDED_RES_MSG,
  INTERNAL_ERROR_RES_MSG,
  TOO_MANY_REQUESTS_RES_MSG,
  PAGE_NOT_FOUND_RES_MSG,
  WRONG_URL_FORMAT_RES_MSG,
  CYRILLIC_ONLY_RES_MSG,
  LATIN_ONLY_RES_MSG,
  WRONG_EMAIL_FORMAT_RES_MSG,
  WRONG_PASS_OR_EMIAL_RES_MSG,
};
