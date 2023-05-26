class Sockets {
  constructor(io) {
    this.io = io;
    this.onConnection.bind(this)
    this.socketEvents();
  }

  onConnection(socket) {
    
  }

  socketEvents() {
    this.io.on('connection', this.onConnection);
  }
}

module.exports = Sockets;
