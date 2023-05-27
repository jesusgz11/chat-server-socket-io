const { ValidatorInputError } = require('../utils/error/validator-input-error');

const generateValidatorError = ({ message, errorsInputs }) => {
  return new ValidatorInputError({ message, errorsInputs });
};

module.exports = {
  generateValidatorError,
};
