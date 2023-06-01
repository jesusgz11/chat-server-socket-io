const registerChatHanlders = require('../handlers/chat');

class Sockets {
  constructor(io) {
    this.io = io;
    this.onConnection.bind(this);
    this.socketEvents();
  }

  onConnection(socket) {
    registerChatHanlders({ io: this.io, socket });
  }

  socketEvents() {
    this.io.on('connection', this.onConnection);
  }
}

module.exports = Sockets;
