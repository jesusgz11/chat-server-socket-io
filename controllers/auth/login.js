const { response, request } = require('express');
const { sendResponse } = require('../../helpers/send-response');

const login = async (req = request, res = response, next) => {
  try {
    const { password, email } = req.body;
    sendResponse(res, {
      payload: { ok: true, password, email },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
