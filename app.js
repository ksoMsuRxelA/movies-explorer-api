require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routes = require('./routes/index');
const {
  createUser,
  authUser,
  unauthUser,
} = require('./controllers/users');
const NotFoundError = require('./utils/customErrors/NotFoundError');
const {
  joiObjectSignup,
  joiObjectSignin,
} = require('./utils/JoiOptsObjs');
const rateLimitOpts = require('./utils/rateLimitOpts');
const centralErrorHandler = require('./utils/centralErrorHandler');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(rateLimit(rateLimitOpts));

app.post('/signup', celebrate(joiObjectSignup), createUser);
app.post('/signin', celebrate(joiObjectSignin), authUser);
app.post('/signout', unauthUser);

app.use(auth);

app.use('/', routes);
app.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует.'));
});

app.use(errorLogger);

app.use(errors());

app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`App has been started on port: ${PORT}`);
});
