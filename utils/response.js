const { MESSAGES } = require('../constants/messages');
const { STATUS_CODES } = require('../constants/status-codes');

class APISuccessfulResponse {
  httpStatusCode = STATUS_CODES.OK;
  message = MESSAGES.SUCCESSFUL_RESPONSE;
  payload;
  constructor({ httpStatusCode, message, payload }) {
    if (httpStatusCode) {
      this.httpStatusCode = httpStatusCode;
    }
    if (message) {
      this.message = message;
    }
    this.payload = payload;
  }
}

module.exports = {
  APISuccessfulResponse,
};
