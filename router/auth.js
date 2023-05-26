/*
PATH: api/login

*/

const { Router } = require('express');
const { createNewUser } = require('../controllers/auth/create-new-user');
const { login } = require('../controllers/auth/login');
const { renewToken } = require('../controllers/auth/renew-token');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const {
  requireEmail,
  requirePassword,
  requireUsername,
  emailExist,
} = require('../helpers/user-validations');

const router = Router();

router.post(
  '/new',
  [
    requireUsername(),
    requireEmail(),
    requirePassword(),
    emailExist(),
    validateFields,
  ],
  createNewUser
);

router.post('/', [requireEmail(), requirePassword(), validateFields], login);

router.get('/renew-token', renewToken);

module.exports = router;
