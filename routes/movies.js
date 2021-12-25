const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getSavedMovies,
  postNewMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  joiObjectMoviePost,
  joiObjectMovieDel,
} = require('../utils/JoiOptsObjs');

router.get('/movies', getSavedMovies);

router.post('/movies', celebrate(joiObjectMoviePost), postNewMovie);

router.delete('/movies/:movieId', celebrate(joiObjectMovieDel), deleteMovieById);

module.exports = router;
