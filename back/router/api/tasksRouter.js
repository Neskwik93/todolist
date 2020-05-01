const router = require('express').Router();
const { authenticate } = require('../../middleware/authenticate');
const TasksController = require('../../controllers/tasksController');

router.get('/getByTaskListId/:taskListId', authenticate, TasksController.getByTaskListId);
router.post('/add', authenticate, TasksController.add);
router.put('/complete', authenticate, TasksController.complete);
router.delete('/delete/:id', authenticate, TasksController.delete);

module.exports = router;