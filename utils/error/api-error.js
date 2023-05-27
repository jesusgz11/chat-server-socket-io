const { MESSAGES } = require('../../constants/messages');
const { STATUS_CODES } = require('../../constants/status-codes');

class APIError extends Error {
  httpStatusCode = STATUS_CODES.SERVER_ERROR;
  ok = false;

  constructor({ httpStatusCode, message }) {
    if (message) {
      super(message);
    }
    if (!message) super(MESSAGES.SERVER_ERROR);

    if (httpStatusCode) {
      this.httpStatusCode = httpStatusCode;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  APIError,
};
