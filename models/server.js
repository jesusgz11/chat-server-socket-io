// Servidor Express
const express = require('express');
// Servidor de Sockets
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConection } = require('../database/config');

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
    // API
    this.app.use('/api/login', require('../router/auth'));
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
  }
}

module.exports = Server;
