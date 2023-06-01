const { generateApiError } = require('../helpers/generate-api-error');
const { APIError } = require('../utils/error/api-error');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  try {
    const token = req.header('x-token');
    if (!token) {
      throw generateApiError({
        message: 'No token provided',
        httpStatusCode: 401,
      });
    }
    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.uid = payload.uid;
    return next();
  } catch (err) {
    if (err instanceof APIError) {
      throw err;
    }
    throw generateApiError({
      message: 'Invalid token',
      httpStatusCode: 401,
    });
  }
};

module.exports = {
  validateJWT,
};
