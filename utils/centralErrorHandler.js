module.exports = (err, req, res, next) => {
  if (err) {
    const { statusCode = 500, message } = err;
    return res
      .status(statusCode) // чтобы в консоли не было ошибок
      .send({
        message: statusCode === 500
          ? '500 На сервере произошла ошибка.'
          : message,
        status: statusCode,
      });
  }
  next();
};
