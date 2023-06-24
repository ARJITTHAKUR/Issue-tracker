// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: query.sql

package sql

import (
	"context"
)

const getUser = `-- name: GetUser :one
SELECT created_at, updated_at, name FROM users
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetUser(ctx context.Context) (User, error) {
	row := q.db.QueryRowContext(ctx, getUser)
	var i User
	err := row.Scan(&i.CreatedAt, &i.UpdatedAt, &i.Name)
	return i, err
}