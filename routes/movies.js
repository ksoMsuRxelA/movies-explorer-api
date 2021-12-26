const router = require('express').Router();
const {
  getSavedMovies,
  postNewMovie,
  deleteMovieById,
} = require('../controllers/movies');

const { joiMoviePostValidate, joiMovieDelValidate } = require('../utils/JoiValidation');

router.get('/movies', getSavedMovies);

router.post('/movies', joiMoviePostValidate, postNewMovie);

router.delete('/movies/:movieId', joiMovieDelValidate, deleteMovieById);

module.exports = router;
