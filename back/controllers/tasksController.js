const { pool } = require('../config/database');

class TasksController {
    static async getByTaskListId(req, res) {
        let taskListId = req.params.taskListId;
        try {
            let result = await pool.query('SELECT * FROM tasks WHERE task_list_id=$1 AND NOT deleted ORDER BY id;', [taskListId]);
            return res.status(200).json({ response: result.rows });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async add(req, res) {
        let task = req.body;
        if (!task.task_list_id || !task.short_desc || !task.end_date) {
            return res.status(200).json({ error: 'missing parameters' });
        }
        try {
            let queryStr = `INSERT INTO tasks 
            (task_list_id, short_desc, long_desc, created_date, end_date, completed, deleted)
            VALUES ($1, $2 ,$3, $4, $5, $6, $7) RETURNING id;`;
            let result = await pool.query(queryStr, [
                task.task_list_id, task.short_desc, task.long_desc, new Date(), task.end_date, false, false
            ]);
            return res.status(201).json({ response: { newId: result.rows[0].id } });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        let taskId = req.params.id;
        try {
            await pool.query('UPDATE tasks SET deleted=true WHERE id=$1;', [taskId]);
            return res.status(200).json({ response: 'task deleted' });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    static async complete(req, res) {
        let task = req.body;
        if (task.completed === null || task.completed === undefined || !task.id) {
            return res.status(200).json({ error: 'missing parameters' });
        }
        try {
            await pool.query('UPDATE tasks SET completed=$1 WHERE id=$2;', [task.completed, task.id]);
            return res.status(200).json({ response: 'task updated' });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    static async deleteTasksByTaskListId(taskListId) {
        return new Promise((resolve, reject) => {
            if (!taskListId) reject({ message: 'task list id unknown' });
            pool.query('UPDATE tasks SET deleted=true WHERE task_list_id=$1;', [taskListId]).then(() => {
                resolve({ response: 'all tasks from task list ' + taskListId + ' has been deleted' });
            }).catch(err => reject(err));
        });
    }
}

module.exports = TasksController;