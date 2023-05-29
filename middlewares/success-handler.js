const { APISuccessfulResponse } = require('../utils/response');

const successHandler = function ({ payload, message, statusCode }) {
  const {
    httpStatusCode,
    message: msg,
    payload: data,
  } = new APISuccessfulResponse({
    httpStatusCode: statusCode,
    message,
    payload,
  });
  this.status(httpStatusCode).json({
    httpStatusCode,
    message: msg,
    data,
  });
};

module.exports = successHandler;
