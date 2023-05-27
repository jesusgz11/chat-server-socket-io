const { generateApiError } = require('../helpers/generate-api-error');

const validateJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    throw generateApiError({
      httpStatusCode: err.status,
      message: err.message,
    });
  }
  return next();
};

module.exports = {
  validateJson,
};
