const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');

router.use('/', users);
router.use('/', movies);

module.exports = router;
