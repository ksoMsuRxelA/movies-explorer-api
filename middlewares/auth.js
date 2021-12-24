const jwt = require('jsonwebtoken');
const UnauthError = require('../utils/customErrors/UnauthError');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new UnauthError('Неавторизованный запрос. Пройдите авторизацию.');
    }

    let payload = undefined;
    const { NODE_ENV, JWT_SECRET } = process.env;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret_code');
    } catch (err) {
      throw new UnauthError('Невалидный токен авторизации.');
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
