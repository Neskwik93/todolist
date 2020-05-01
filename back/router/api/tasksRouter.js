const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const TasksController = require('../../controllers/tasksController');

router.get('/:taskListId', authenticate, TasksController.getByTaskListId);
router.post('/', authenticate, TasksController.add);
router.put('/', authenticate, TasksController.complete);
router.delete('/:id', authenticate, TasksController.delete);

module.exports = router;