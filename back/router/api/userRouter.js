const router = require('express').Router();
const UsersController = require('../../controllers/userController');

router.post('/login', UsersController.login);
router.post('/register', UsersController.register);

module.exports = router;