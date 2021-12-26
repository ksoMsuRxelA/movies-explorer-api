const router = require('express').Router();
const { joiSignupValidate, joiSigninValidate } = require('../utils/JoiValidation');
const {
  createUser,
  authUser,
  unauthUser,
} = require('../controllers/users');

router.post('/signup', joiSignupValidate, createUser);
router.post('/signin', joiSigninValidate, authUser);
router.post('/signout', unauthUser);

module.exports = router;
