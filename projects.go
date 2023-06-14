package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func CreateProject(c *fiber.Ctx) error {
	tmpProject := &Project{}

	if err := c.BodyParser(tmpProject); err != nil {
		fmt.Println(err)
		c.JSON(&fiber.Map{
			"success": false,
			"message": "Error occured",
		})
		return err
	}
	DB.Create(&tmpProject)
	return c.JSON(&fiber.Map{
		"success":  true,
		"meassage": "user created",
	})
}
