const { validationResult } = require('express-validator');
const {
  generateValidatorError,
} = require('../helpers/generate-validator-error');
const { MESSAGES } = require('../constants/messages');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors.mapped();
    throw generateValidatorError({
      errorsInputs: mappedErrors,
      message:
        mappedErrors.email.msg === MESSAGES.EMAIL_EXISTS
          ? MESSAGES.EMAIL_EXISTS
          : undefined,
    });
  }
  return next();
};

module.exports = {
  validateFields,
};
