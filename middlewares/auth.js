const jwt = require('jsonwebtoken');
const UnauthError = require('../utils/customErrors/UnauthError');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new UnauthError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
    }

    let payload;
    const { NODE_ENV, JWT_SECRET } = process.env;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret_code');
    } catch (err) {
      throw new UnauthError('При авторизации произошла ошибка. Переданный токен некорректен.');
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
