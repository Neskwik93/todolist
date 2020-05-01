const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const TaskListController = require('../../controllers/taskListController');

router.get('/', authenticate, TaskListController.getByUser);
router.post('/', authenticate, TaskListController.add);
router.delete('/:id', authenticate, TaskListController.delete);

module.exports = router;