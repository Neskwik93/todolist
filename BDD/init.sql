CREATE USER eric WITH PASSWORD 'toto123';

ALTER USER eric WITH SUPERUSER;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(100),
    firstname VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

INSERT INTO users (lastname, firstname, email, pwd) VALUES ('Bomann', 'Eric', 'monadressemail@orange.com', 'password');