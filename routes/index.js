const express = require('express');
const path = require('path');
const fs = require('fs');
const { generateApiError } = require('../helpers/generate-api-error');
const { STATUS_CODES } = require('../constants/status-codes');

const apiPath = path.resolve(__dirname, 'api');

module.exports = (app) => {
  // Root HTML
  app.use(express.static(path.resolve(__dirname, '../public')));
  // API 
  fs.readdirSync(apiPath).forEach((file) => {
    if (file === 'index.js') return;
    const path = '/api/' + (file !== 'root.js' ? file.replace('.js', '') : '');
    const router = express.Router();
    const route = require(require('path').join(apiPath, file))(router);
    app.use(path, route);
  });
  // Other routes
  app.all('*', (req) => {
    console.log(req.query);
    throw generateApiError({
      httpStatusCode: STATUS_CODES.NOT_FOUND,
      message: `Can't find ${req.originalUrl} on this server!`,
    });
  });
};
