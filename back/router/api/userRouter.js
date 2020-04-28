const router = require('express').Router();
const UsersController = require('../../controllers/userController');

router.get('/:id', UsersController.getUserById);

module.exports = router;