const { pool } = require('../config/database');

class TaskListController {
    static async getByUserId(req, res) {
        return res.status(200).json({ response: 'it works' });
    }

    static async add(req, res) {
        let userId = req.userId;
        let taskList = req.body;
        if (!taskList) return res.status(400).json({ error: 'no task list sent' });
        if (!taskList.name) return res.status(400).json({ error: 'no task list name' });

        try {
            let queryStr = `SELECT * FROM task_list
            WHERE name=$1 AND user_id=$2;`;
            let taskListRows = await pool.query(queryStr, [taskList.name, userId]);
            console.log(taskListRows)
            if (taskListRows.rows && taskListRows.rows.length > 0) return res.status(400).json({ error: 'name already taken' });

            queryStr = `INSERT INTO task_list (name, user_id, deleted)
            VALUES ($1, $2, $3);`;
            await pool.query(queryStr, [taskList.name, userId, 'false']);
            return res.status(200).json({ response: 'task list created' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async delete(req, res) {
        return res.status(200).json({ response: 'it works' });
    }
}

module.exports = TaskListController;