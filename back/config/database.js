const { Pool } = require('pg');

let connectionString;
if(process.env.DB_USER) {
    connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
} else {
    connectionString = `postgresql://neskwik:root@localhost:5432/todolist_db`;
}
console.log(connectionString)

const pool = new Pool({
    connectionString: connectionString, 
    ssl: false,
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

module.exports = { pool }