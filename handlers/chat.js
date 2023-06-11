const { saveMessage } = require('../controllers/sockets/messages');
const { userConnection, getUsers } = require('../controllers/sockets/user');
const { validateSocketToken } = require('../helpers/validate-socket-token');

module.exports = async ({ io, socket }) => {
  const [isValid, uid] = validateSocketToken(socket.handshake.query['x-token']);

  const disconnectSocket = async () => {
    try {
      await userConnection('disconnect', uid);
      io.emit('users-list', await getUsers());
    } catch (error) {
      console.log(error);
    }
  };

  const personalMessage = async (payload) => {
    const message = await saveMessage(payload);
    io.to(payload.to).emit('personal-message', message);
    io.to(payload.from).emit('personal-message', message);
  };

  if (!isValid) {
    return socket.disconnect();
  }

  await userConnection('connect', uid);

  socket.join(uid);
  io.emit('users-list', await getUsers());
  socket.on('personal-message', personalMessage);
  socket.on('disconnect', disconnectSocket);
};
