const { STATUS_CODES } = require('../../constants/status-codes');
const { APIError } = require('./api-error');

class ValidatorInputError extends APIError {
  errorsInputs;
  constructor({ errorsInputs }) {
    super({
      httpStatusCode: STATUS_CODES.BAD_REQUEST,
      message: 'Invalid Inputs',
    });
    this.errorsInputs = errorsInputs;
  }
}

module.exports = {
  ValidatorInputError,
};
