CREATE USER eric WITH PASSWORD 'toto123';

ALTER USER eric WITH SUPERUSER;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(100),
    firstname VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

INSERT INTO users (lastname, firstname, email, password) VALUES ('Bomann', 'Eric', 'monadressemail@orange.com', 'password');

CREATE TABLE task_list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    user_id INTEGER,
    deleted BOOLEAN DEFAULT false
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task_list_id INTEGER,
    short_desc VARCHAR(100),
    long_desc VARCHAR(100),
    created_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    completed BOOLEAN DEFAULT false,
    deleted BOOLEAN DEFAULT false
);