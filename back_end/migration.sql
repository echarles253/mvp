DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
users_name varchar(30),
post_subject text,
post text
);