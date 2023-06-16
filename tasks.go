package main

import (
	"errors"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func Createtask(c *fiber.Ctx) error {
	type task struct {
		ProjectID   uint
		Description string
		UserID      uint
	}
	tempTask := task{}
	if err := c.BodyParser(&tempTask); err != nil {
		log.Fatal(err)
		c.JSON(&fiber.Map{
			"success": false,
			"message": "body parsing failed",
		})
		return err
	}
	fmt.Println("json body ==>", tempTask)

	tempProject := new(Project)
	type project struct {
		ID uint
	}
	res := DB.Where(&project{ID: tempTask.ProjectID}).First(&tempProject) // temp project struct for where query and mutation in complete shape
	fmt.Println("queried ==>", tempProject)

	if res.Error != nil || tempProject.ID != tempTask.ProjectID { // proper error handling
		var err error // error variable
		if res.RowsAffected == 0 {
			fmt.Println("rows effected ==> ", res.RowsAffected)
			err = errors.New("project not found")
		} else {
			err = res.Error
		}
		return c.JSON(&fiber.Map{ // return statement for request
			"success": false,
			"message": err.Error(),
		})
	}

	// create a task

	res = DB.Create(tempTask)
	if res.Error != nil {
		return c.JSON(&fiber.Map{
			"success": false,
			"message": res.Error,
		})
	}

	return c.JSON(&fiber.Map{
		"success": true,
		"message": "task created successfully",
	})
}
