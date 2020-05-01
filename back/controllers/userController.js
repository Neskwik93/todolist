const { pool } = require('../config/database');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/jwt');

class UsersController {
    static async testAuth(req, res) {
        return res.status(200).json({ respone: 'Hello (clin d\'oeil Nicolas)' });
    }

    static async register(req, res) {
        let user = req.body;
        let regexmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!user) {
            return res.status(200).send({error: 'no user found'});
        }
        if (!user.email || !user.password) {
            return res.status(200).json({ error: 'missing parameters' });
        }
        if (!regexmail.test(user.email)) {
            return res.status(200).json({ error: 'invalid email address' });
        }
        try {
            let userRows = await pool.query('SELECT * FROM users WHERE email=$1 ORDER BY id;', [user.email]);

            if (userRows.rows && userRows.rows.length > 0) {
                return res.status(200).json({ error: 'mail already used' });
            }

            let hashedPassword = await bcrypt.hash(user.password, 10);
            let queryStr = `
            INSERT INTO users (lastname, firstname, email, password) 
            VALUES ($1, $2, $3, $4);
            `;

            await pool.query(queryStr, [user.lastname, user.firstname, user.email, hashedPassword]);
            return res.status(201).json({ response: 'user created' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async login(req, res) {
        let user = req.body;
        let userDb, token;
        if (!user) return res.status(500).json({ error: 'no user found' });
        try {
            let userRows = await pool.query('SELECT * FROM users WHERE email=$1 ORDER BY id;', [user.email]);
            if (!userRows.rows || userRows.rows.length === 0) {
                return res.status(200).json({ error: 'no user found' });
            }

            userDb = userRows.rows[0];
            let match = await bcrypt.compare(user.password, userDb.password);
            if (!match) {
                return res.status(200).json({ error: 'login or password not correct' });
            }

            token = createAccessToken(userDb.id);
            return res.header('x-auth', token).json({ response: { token: token } });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = UsersController;