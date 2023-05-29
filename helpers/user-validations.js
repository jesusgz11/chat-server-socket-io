const { check } = require('express-validator');
const User = require('../models/user');
const { MESSAGES } = require('../constants/messages');

const requireEmail = () =>
  check('email', 'El email tiene un formato inválido').isEmail();

const requirePassword = () =>
  check('password', 'El password es obligatorio').not().isEmpty();

const requireUsername = () =>
  check('username', 'El username es obligatorio').not().isEmpty();

const emailExist = () =>
  check('email').custom(async (value) => {
    const existingUser = await User.findOne({ email: value });
    if (existingUser) {
      throw new Error(MESSAGES.EMAIL_EXISTS);
    }
  });

module.exports = {
  requireEmail,
  requirePassword,
  requireUsername,
  emailExist,
};
