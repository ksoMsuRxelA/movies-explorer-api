const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getCurrentUser, patchUserData } = require('../controllers/users');
const { joiObjectUserPatch } = require('../utils/JoiOptsObjs');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', celebrate(joiObjectUserPatch), patchUserData);

module.exports = router;
