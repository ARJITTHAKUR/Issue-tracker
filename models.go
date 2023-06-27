package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        uint   `json:"userId",gorm:"primaryKey"`
	Name      string `json:"name"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Project struct {
	gorm.Model
	ID        uint   `gorm:"primaryKey"`
	Name      string `json:"projectname" validate:"required" gorm:"unique:compositeindex;type:text;not null"`
	UserId    uint
	User      User
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
	Status      string `json:"status"`
	Priority    string `json:"priority"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
