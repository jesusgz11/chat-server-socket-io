const Messages = require('../../models/message');

const saveMessage = async (payload) => {
  try {
    const message = new Messages(payload);
    await message.save();
    return message;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  saveMessage,
};
