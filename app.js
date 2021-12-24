require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { Joi, celebrate, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const movies = require('./routes/movies');
const {
  createUser,
  authUser,
  unauthUser,
} = require('./controllers/users');
const NotFoundError = require('./utils/customErrors/NotFoundError');

const { PORT = 3000 } = process.env;

const joiObjectSignup = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const joiObjectSignin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', celebrate(joiObjectSignup), createUser);
app.post('/signin', celebrate(joiObjectSignin), authUser);
app.post('/signout', unauthUser);

app.use(auth);

app.use('/', users);
app.use('/', movies);
app.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка. Приносим свои извинения.'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App has been started on port: ${PORT}`);
});
