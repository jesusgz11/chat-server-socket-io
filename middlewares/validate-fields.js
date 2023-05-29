const { validationResult } = require('express-validator');
const {
  generateValidatorError,
} = require('../helpers/generate-validator-error');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    throw generateValidatorError({
      errorsInputs: mappedErrors,
    });
  }
  return next();
};

module.exports = {
  validateFields,
};
