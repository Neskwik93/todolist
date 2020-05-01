const { pool } = require('../config/database');
const TasksController = require('./tasksController');

class TaskListController {
    static async getByUser(req, res) {
        let userId = req.userId;
        try {
            let result = await pool.query('SELECT id, name FROM task_list WHERE user_id=$1 AND NOT deleted ORDER BY id;', [userId]);
            return res.status(200).json({ response: result.rows });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async add(req, res) {
        let userId = req.userId;
        let taskList = req.body;
        if (!taskList) return res.status(200).json({ error: 'no task list sent' });
        if (!taskList.name) return res.status(200).json({ error: 'no task list name' });

        try {
            let queryStr = `SELECT * FROM task_list
            WHERE name=$1 AND user_id=$2 AND NOT deleted;`;
            let taskListRows = await pool.query(queryStr, [taskList.name, userId]);
            if (taskListRows.rows && taskListRows.rows.length > 0) return res.status(200).json({ error: 'name already taken' });

            queryStr = `INSERT INTO task_list (name, user_id, deleted)
            VALUES ($1, $2, $3) RETURNING id;`;
            let result = await pool.query(queryStr, [taskList.name, userId, 'false']);
            return res.status(201).json({ response: { newId: result.rows[0].id } });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        let taskListId = req.params.id;
        try {
            await TasksController.deleteTasksByTaskListId(taskListId);
            await pool.query('UPDATE task_list SET deleted=true WHERE id=$1;', [taskListId]);
            return res.status(200).json({ response: 'task list deleted' });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = TaskListController;