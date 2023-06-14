package main

import "time"

type User struct {
	ID        uint `gorm:"primaryKey"`
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Project struct {
	ID        uint `gorm:"primaryKey"`
	Name      string
	UserId    uint
	CreatedAt time.Time
	UpdatedAt time.Time
}
