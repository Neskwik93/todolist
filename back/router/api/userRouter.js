const router = require('express').Router();
const UsersController = require('../../controllers/userController');

router.get('/', UsersController.getUserById);

module.exports = router;