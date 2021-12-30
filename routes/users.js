const router = require('express').Router();
const { getCurrentUser, patchUserData } = require('../controllers/users');
const { joiUserPatchValidate } = require('../utils/JoiValidation');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', joiUserPatchValidate, patchUserData);

module.exports = router;
