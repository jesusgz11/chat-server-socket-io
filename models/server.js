// Servidor Express
const express = require('express');
// Servidor de Sockets
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConection } = require('../database/config');
const { errorHandler } = require('../middlewares/error-handler');
const { STATUS_CODES } = require('../constants/status-codes');
const { apiError } = require('../helpers/generate-api-error');
const { validateJson } = require('../middlewares/validate-json');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    // Connect to DB
    dbConection();
    // HTTP Server
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
  }

  middlewares() {
    // Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    // CORS
    this.app.use(cors());
    // Parse Body
    this.app.use(express.json());
    // Validate JSON
    this.app.use(validateJson);
    // API
    this.app.use('/api/login', require('../router/auth'));
    // Other Routes
    this.app.all('*', (req) => {
      console.log(req.query);
      throw apiError({
        httpStatusCode: STATUS_CODES.NOT_FOUND,
        message: `Can't find ${req.originalUrl} on this server!`,
      });
    });
    // Error handler
    this.app.use(errorHandler);
  }

  initSockets() {
    new Sockets(this.io);
  }

  init() {
    // Init middlewares
    this.middlewares();

    // Init  sockets
    this.initSockets();

    // Init server
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto: ', this.port);
    });
    // Unhandled rejections shut down the server
    process.on('unhandledRejection', (error) => {
      console.log(error.message + ' Shutting down the server .... ');
      this.server.close(() => {
        process.exit(1);
      });
    });
  }
}

module.exports = Server;
