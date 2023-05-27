const { MESSAGES } = require('../constants/messages');
const { STATUS_CODES } = require('../constants/status-codes');

const errorHandler = (err, req, res, next) => {
  // default HTTP status code and error message
  let httpStatusCode = err?.httpStatusCode || STATUS_CODES.SERVER_ERROR;
  let message = err?.message || MESSAGES.SERVER_ERROR;
  let ok = err?.ok || false;

  const customError = { ...err, message, httpStatusCode, ok };

  console.log(customError);

  // return the standard error response
  res.status(httpStatusCode).json(customError);

  return next();
};

module.exports = {
  errorHandler,
};
