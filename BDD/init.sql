CREATE USER eric WITH PASSWORD 'toto123';

ALTER USER eric WITH SUPERUSER;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(100),
    firstname VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    token VARCHAR 
);

INSERT INTO users (lastname, firstname, email, password) VALUES ('Bomann', 'Eric', 'monadressemail@orange.com', 'password');

CREATE TABLE task_list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    deleted BOOLEAN
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    task_list_id INTEGER,
    short_desc VARCHAR(100),
    long_desc VARCHAR(100),
    created_date DATE,
    end_date DATE(100),
    completed BOOLEAN,
    deleted BOOLEAN
);