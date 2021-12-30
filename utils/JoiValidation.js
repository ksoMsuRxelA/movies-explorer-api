// При работе над 15-ой работой я уже пытался применить
// модуль validator и его метод isURL, но ревьювер сказал
// не использовать данный метод, потому что он плохо
// валидирует ссылки, а написать свой или взять из сети.

const urlRegEx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const { Joi, celebrate } = require('celebrate');

const joiSignupValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const joiSigninValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const joiMoviePostValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(urlRegEx).required(),
    trailer: Joi.string().pattern(urlRegEx).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(urlRegEx).required(),
    movieId: Joi.number().required(),
  }),
});

const joiMovieDelValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const joiUserPatchValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  joiSignupValidate,
  joiSigninValidate,
  joiMoviePostValidate,
  joiMovieDelValidate,
  joiUserPatchValidate,
};
