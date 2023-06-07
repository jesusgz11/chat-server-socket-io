const { generateApiError } = require('../helpers/generate-api-error');
const User = require('../models/user');
const mongoose = require('mongoose');

const validateUid = async (req, res, next) => {
  try {
    const isValidUid = mongoose.isValidObjectId(req.uid);
    if (!isValidUid)
      throw generateApiError({ message: 'Invalid user id', httpStatusCode: 400 });
    const userDB = await User.findById(req.uid);
    if (!userDB) {
      throw generateApiError({
        httpStatusCode: 401,
        message: 'Not email found',
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  validateUid,
};
