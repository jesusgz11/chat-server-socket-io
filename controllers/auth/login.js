const { response, request } = require('express');
const { generateApiError } = require('../../helpers/generate-api-error');
const { generateJWT } = require('../../helpers/generate-jwt');

const login = async (req = request, res = response, next) => {
  try {
    const { password } = req.body;

    const isValidPassword = await req.userDB.comparePasswords(
      password,
      req.userDB.password
    );

    if (!isValidPassword) {
      throw generateApiError({
        message: 'Incorrect user or password',
        httpStatusCode: 401,
      });
    }

    const token = await generateJWT(req.userDB.id);

    delete req.userDB;

    res.success({
      payload: { token },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
