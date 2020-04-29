const { pool } = require('../config/database');

class UsersController {
    static async getUserById(req, res) {
        pool.query('SELECT * FROM users;').then(response => {
            res.status(200).json({ response: response.rows });
        }).catch(err => res.status(500).json({ error: err }));
    };
}

module.exports = UsersController;