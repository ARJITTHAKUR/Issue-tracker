package main

import (
	"errors"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Createtask(c *fiber.Ctx) error {
	// type task struct {
	// 	ProjectID   uint   `json:"projectId"`
	// 	Description string `json:"description"`
	// 	UserID      uint   `json:"userId"`
	// 	Status      string `json:"status"`
	// 	Priority    string `json:"priority"`
	// }
	tempTask := Task{}
	if err := c.BodyParser(&tempTask); err != nil {
		return c.JSON(&fiber.Map{
			"success": false,
			"message": "body parsing failed",
		})

	}
	// fmt.Printf("temptask => %+v\n", tempTask)
	tempProject := new(Project)
	type project struct {
		ID uint
	}
	resError := DB.Where("id = ?", tempTask.ProjectID).First(tempProject).Error // temp project struct for where query and mutation in complete shape

	// fmt.Printf("queried: %+v\n", tempProject)

	if resError != nil {
		if errors.Is(resError, gorm.ErrRecordNotFound) {
			return c.Status(fiber.StatusInternalServerError).SendString(resError.Error())
		} else {
			return c.Status(fiber.StatusInternalServerError).SendString(resError.Error())
		}
	}
	task := Task{
		ProjectID:   tempTask.ProjectID,
		Description: tempTask.Description,
		Status:      tempTask.Status,
		Priority:    tempTask.Priority,
	}
	taskErr := DB.Create(&task).Error

	if taskErr != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(taskErr.Error())
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"task": task,
	})

}

func GetTasks(c *fiber.Ctx) error {
	// get project id from params

	id := c.Params("id")

	var tasks []Task
	err := DB.Where("project_Id = ?", id).Find(&tasks).Error

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"tasks": tasks,
	})

}

func ChangeStatus(c *fiber.Ctx) error {
	status := c.Params("status")
	id := c.Params("id")
	// fmt.Printf("id : %s, status : %s", id, status)
	idInt, err := strconv.Atoi(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	var task Task
	task.ID = uint(idInt)
	findErr := DB.First(&task).Error

	if findErr != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(findErr.Error())
	}

	task.Status = status

	putErr := DB.Save(&task).Error

	if putErr != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(putErr.Error())
	} else {
		return c.Status(fiber.StatusOK).JSON(&fiber.Map{
			"task": task,
		})
	}

}
