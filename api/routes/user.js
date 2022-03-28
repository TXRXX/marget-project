const router = require('express').Router();
const controllers = require('../controllers/user');

router.get('/auth/me', controllers.getUser);

module.exports = router;
