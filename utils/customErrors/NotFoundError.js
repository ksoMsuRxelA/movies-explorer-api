class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NOT_FOUND';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
