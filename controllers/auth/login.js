const { response, request } = require('express');

const login = async (req = request, res = response, next) => {
  try {
    const { password, email } = req.body;
    res.success({
      payload: { ok: true, password, email },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
