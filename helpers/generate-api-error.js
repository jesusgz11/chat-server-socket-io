const { APIError } = require('../utils/error/api-error');

const generateApiError = ({ message, httpStatusCode }) => {
  return new APIError({ message, httpStatusCode });
};

module.exports = {
  generateApiError,
};
