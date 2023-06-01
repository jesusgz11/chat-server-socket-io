const { generateApiError } = require('../helpers/generate-api-error');
const User = require('../models/user');

const validateExistingEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDB = await User.findOne({ email });
    if (!userDB) {
      throw generateApiError({
        httpStatusCode: 404,
        message: 'Not email found',
      });
    }
    req.userDB = userDB;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateExistingEmail,
};
