//  PATH: api/auth

const { createNewUser } = require('../../controllers/auth/create-new-user');
const { login } = require('../../controllers/auth/login');
const { renewToken } = require('../../controllers/auth/renew-token');
const { validateFields } = require('../../middlewares/validate-fields');
const {
  requireEmail,
  requirePassword,
  requireUsername,
  emailExist,
} = require('../../helpers/user-validations');

module.exports = (router) => {
  router
    .post(
      '/create-user',
      [
        requireUsername(),
        requireEmail(),
        requirePassword(),
        emailExist(),
        validateFields,
      ],
      createNewUser
    )

    .post('/login', [requireEmail(), requirePassword(), validateFields], login)

    .get('/renew-token', renewToken);

  return router;
};
