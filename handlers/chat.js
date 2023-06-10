const { userConnection, getUsers } = require('../controllers/sockets/user');
const { validateSocketToken } = require('../helpers/validate-socket-token');

module.exports = async ({ io, socket }) => {
  const [isValid, uid] = validateSocketToken(socket.handshake.query['x-token']);

  if (!isValid) {
    console.log('Socket not identified');
    return socket.disconnect();
  }

  await userConnection('connect', uid);

  io.emit('users-list', await getUsers(uid));

  socket.on('disconnect', async () => {
    console.log('cliente desconectado');
    await userConnection('disconnect', uid);
  });
};
