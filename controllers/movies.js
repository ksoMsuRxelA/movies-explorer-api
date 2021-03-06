const Movie = require('../models/Movie');
const DataError = require('../utils/customErrors/DataError');
const NotFoundError = require('../utils/customErrors/NotFoundError');
const ForbiddenError = require('../utils/customErrors/ForbiddenError');

const getSavedMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send({ data: movies }))
  .catch(next);

const postNewMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  }).then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(`Переданы некорректные данные: ${err.message}`));
        return;
      }
      next(err);
    });
};

const deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError(`Фильм с идентификатором ${movieId} не был найден и не удален.`);
    }
    if (movie.owner._id.toString() !== req.user._id) {
      throw new ForbiddenError('У вас недостаточно прав, чтобы удалить этот фильм.');
    }
    const movieById = await Movie.findByIdAndRemove(movieId);
    if (movieById) {
      return res.send({ data: movieById });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new DataError(`Фильм с идентификатором ${movieId} не был найден и не удален.`));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getSavedMovies,
  postNewMovie,
  deleteMovieById,
};
