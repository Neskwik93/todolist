const { pool } = require('../config/database');

class TasksController {
    static async getByTaskListId(req, res) {
        return res.status(200).json({ response: 'it works' });
    }

    static async add(req, res) {
        return res.status(200).json({ response: 'it works' });
    }

    static async delete(req, res) {
        return res.status(200).json({ response: 'it works' });
    }
 
    static async complete(req, res) {
        return res.status(200).json({ response: 'it works' });
    }
} 

module.exports = TasksController;