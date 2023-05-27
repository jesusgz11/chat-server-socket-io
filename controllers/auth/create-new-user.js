const { response } = require('express');
const User = require('../../models/user');
const { sendResponse } = require('../../helpers/send-response');

const createNewUser = async (req, res = response, next) => {
  try {
    const dataUser = req.body;
    const newUser = new User(dataUser);
    await newUser.save();
    sendResponse(res, {
      message: 'Usuario creado con éxito',
      payload: {
        ok: true,
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewUser,
};
