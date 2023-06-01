// Path: api/messages

const { historyChat } = require('../../controllers/messages/history-chat');
const { validateJWT } = require('../../middlewares/validate-jwt');

module.exports = (router) => {
  router.get('/:from', validateJWT, historyChat);
  return router;
};
