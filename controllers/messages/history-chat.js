const mongoose = require('mongoose');
const Message = require('../../models/message');
const { generateApiError } = require('../../helpers/generate-api-error');

const historyChat = async (req, res, next) => {
  try {
    const userId = req.uid;
    const fromUser = req.params.from;
    const isValidParam = mongoose.isValidObjectId(fromUser);
    if (!isValidParam)
      throw generateApiError({ message: 'Invalid param', httpStatusCode: 400 });

    const lastMessages = await Message.find({
      $or: [
        { from: userId, to: fromUser },
        { to: userId, from: fromUser },
      ],
    })
      .sort({ createdAt: 'desc' })
      .limit(30);

    res.success({
      message: 'Exito',
      payload: {
        messages: lastMessages,
      },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  historyChat,
};
