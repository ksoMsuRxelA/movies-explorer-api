class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DATA_ERROR';
    this.statusCode = 400;
  }
}

module.exports = DataError;
