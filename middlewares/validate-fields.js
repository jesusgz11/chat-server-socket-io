const { validationResult } = require('express-validator');
const {
  generateValidatorError,
} = require('../helpers/generate-validator-error');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw generateValidatorError({
      errorsInputs: errors.mapped(),
    });
  }
  return next();
};

module.exports = {
  validateFields,
};
