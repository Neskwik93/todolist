const router = require('express').Router();

router.use('/users', require('./userRouter'));
router.use('/tasks', require('./tasksRouter'));
router.use('/taskList', require('./taskListRouter'));

module.exports = router;