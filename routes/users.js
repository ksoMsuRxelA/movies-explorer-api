const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser, patchUserData } = require('../controllers/users');

const joiObjectUserPatch = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

router.get('/users/me', getCurrentUser);

router.patch('/users/me', celebrate(joiObjectUserPatch), patchUserData);

module.exports = router;
