const { response } = require('express');
const { APISuccessfulResponse } = require('../utils/response');

const sendResponse = (res = response, { payload, message, statusCode }) => {
  const {
    httpStatusCode,
    message: msg,
    payload: data,
  } = new APISuccessfulResponse({
    httpStatusCode: statusCode,
    message,
    payload,
  });
  res.status(httpStatusCode).json({
    httpStatusCode,
    message: msg,
    data,
  });
};

module.exports = {
  sendResponse,
};
