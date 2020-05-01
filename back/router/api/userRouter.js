const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const UsersController = require('../../controllers/userController');

router.get('/testAuth', authenticate, UsersController.testAuth);
router.post('/login', UsersController.login);
router.post('/register', UsersController.register);

module.exports = router;