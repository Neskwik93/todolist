const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const TaskListController = require('../../controllers/taskListController');

router.get('/getByUser', authenticate, TaskListController.getByUser);
router.post('/add', authenticate, TaskListController.add);
router.delete('/delete/:id', authenticate, TaskListController.delete);

module.exports = router;