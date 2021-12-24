const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getSavedMovies,
  postNewMovie,
  deleteMovieById,
} = require('../controllers/movies');

const joiObjectMoviePost = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).required(),
    trailer: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/).required(),
    movieId: Joi.string().length(24).hex().required(),
  }),
};

const joiObjectMovieDel = {
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
};

router.get('/movies', getSavedMovies);

router.post('/movies', celebrate(joiObjectMoviePost), postNewMovie);

router.delete('/movies/:movieId', celebrate(joiObjectMovieDel), deleteMovieById);

module.exports = router;
