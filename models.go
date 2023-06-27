package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        uint      `json:"userId" gorm:"primaryKey"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Project struct {
	gorm.Model
	ID        uint   `gorm:"primaryKey"`
	Name      string `json:"projectname" validate:"required" gorm:"unique:compositeindex;type:text;not null"`
	UserId    uint   `json:"userId"`
	User      User
	Tasks     []Task    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"tasks"`
	StartDate time.Time `json:"startDate"`
	EndDate   time.Time `json:"endDate"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Task struct {
	ID          uint      `gorm:"primaryKey"`
	ProjectID   uint      `json:"projectId"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	Priority    string    `json:"priority"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
