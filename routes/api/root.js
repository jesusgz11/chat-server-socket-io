module.exports = (router) => {
  router.get('/', (req, res) => {
    res.success({
      message: 'Welcome to chat API',
      payload: {},
    });
  });

  return router;
};
