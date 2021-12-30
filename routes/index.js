const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const signRoute = require('./sign');
const auth = require('../middlewares/auth');

router.use(signRoute);

router.use(auth);

router.use(users);
router.use(movies);

module.exports = router;
