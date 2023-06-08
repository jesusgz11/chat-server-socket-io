const registerChatHandlers = require('../handlers/chat');

class Sockets {
  constructor(io) {
    this.io = io;
    this.onConnection = this.onConnection.bind(this);
    this.socketEvents();
  }

  onConnection(socket) {
    registerChatHandlers({ io: this.io, socket });
  }

  socketEvents() {
    this.io.on('connection', this.onConnection);
  }
}

module.exports = Sockets;
