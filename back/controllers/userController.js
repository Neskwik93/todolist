const { pool } = require('../config/database');
const bcrypt = require('bcrypt');
const { createAccessToken } = require('../utils/jwt');

class UsersController {
    static async getUserById(req, res) {
        pool.query('SELECT * FROM users;').then(response => {
            res.status(200).json({ response: response.rows });
        }).catch(err => res.status(500).json({ error: err }));
    };

    static async register(req, res) {
        let user = req.body;
        let regexmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!user) {
            return res.status(500).send('error');
        }
        if (!user.email || !user.password) {
            return res.status(400).json({ error: 'missing parameters' });
        }
        if (!regexmail.test(user.email)) {
            return res.status(400).json({ error: 'invalid email address' });
        }

        pool.query('SELECT * FROM users WHERE email=$1;', [user.email])
            .then(response => {
                if (response.rows && response.rows.length > 0) {
                    return res.status(400).json({ error: 'mail already used' });
                }

                return bcrypt.hash(user.password, 10);
            })
            .then(hashedPassword => {
                let queryStr = `
                INSERT INTO users (lastname, firstname, email, pwd) 
                VALUES ($1, $2, $3, $4);
                `;

                return pool.query(queryStr, [user.lastname, user.firstname, user.email, hashedPassword]);
            })
            .then(() => {
                return res.status(201).json({ response: 'user created' });
            })
            .catch(err => res.status(500).json({ error: err }));
    }

    static async login(req, res) {
        let user = req.body;
        let userDb, token;
        if (!user) return res.status(500).json({ error: true });

        pool.query('SELECT * FROM users WHERE email=$1;', [user.email])
            .then(result => {
                if (!result.rows || result.rows.length === 0) {
                    return res.status(500).json({ error: 'no user found' });
                }
                userDb = result.rows[0];
                return bcrypt.compare(user.password, userDb.password);
            })
            .then(match => {
                if (match) {
                    token = createAccessToken(userDb.id);
                    return pool.query(`UPDATE users SET token=$1 WHERE id=$2;`, [token, userDb.id]);
                } else {
                    return res.status(200).json({ error: 'login or password not correct' });
                }
            })
            .then(() => {
                return res.header('x-auth', token).json({ response: { token: token } });
            })
            .catch(err => res.status(500).json(err));
    }
}

module.exports = UsersController;