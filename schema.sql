-- name: CreateUser :exec
CREATE TABLE users (
    PRIMARY KEY (ID),
    created_at TIMESTAMP NOT NULL,
    updated_At TIMESTAMP NOT NULL,
    name TEXT NOT NULL
);

-- name: GetUser :one
SELECT * FROM users
WHERE id = ? LIMIT 1;