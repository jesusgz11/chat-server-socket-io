const { generateApiError } = require('../../helpers/generate-api-error');
const User = require('../../models/user');
const mongoose = require('mongoose');

const userConnection = async (action, uid) => {
  try {
    const isValidId = mongoose.isValidObjectId(uid);
    if (!isValidId) {
      throw generateApiError({
        message: 'Ivalid user id',
        httpStatusCode: 400,
      });
    }
    const user = await User.findById(uid);
    switch (action) {
      case 'connect':
        user.online = true;
        break;

      case 'disconnect':
        user.online = false;
        break;

      default:
        break;
    }
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (uid) => {
  try {
    const users = await User.find({ _id: { $ne: uid } }).sort('-online');
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userConnection,
  getUsers,
};
