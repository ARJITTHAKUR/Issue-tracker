package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        uint `gorm:"primaryKey"`
	Name      string
	Projects  []Project `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Project struct {
	gorm.Model
	ID        uint   `gorm:"primaryKey"`
	Name      string `json:"Name",validate:"required"`
	UserId    uint
	Tasks     []Task    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	StartDate time.Time `json:"startDate"`
	EndDate   time.Time `json:"endDate"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Task struct {
	ID          uint `gorm:"primaryKey"`
	ProjectID   uint
	Description string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
