CREATE TABLE users (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP NOT NULL,
    updated_At TIMESTAMP NOT NULL,
    name TEXT NOT NULL
);

DROP TABLE users;
