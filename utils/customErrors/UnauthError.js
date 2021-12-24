class UnauthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UNAUTH_ERROR';
    this.statusCode = 401;
  }
}

module.exports = UnauthError;
