const { response } = require('express');
const User = require('../../models/user');

const createNewUser = async (req, res = response) => {
  try {
    const dataUser = req.body;
    const newUser = new User(dataUser);
    await newUser.save();
    res.json({
      ok: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact the administrator',
    });
  }
};

module.exports = {
  createNewUser,
};
