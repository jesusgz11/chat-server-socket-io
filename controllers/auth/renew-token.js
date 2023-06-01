const { response } = require('express');
const User = require('../../models/user');
const { generateJWT } = require('../../helpers/generate-jwt');

const renewToken = async (req, res = response) => {
  const userId = req.uid;
  const newToken = await generateJWT(userId);
  const user = await User.findById(userId);
  res.success({
    message: 'Renewed token',
    httpStatusCode: 200,
    payload: {
      user,
      token: newToken,
    },
  });
};

module.exports = {
  renewToken,
};
