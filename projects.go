package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func CreateProject(c *fiber.Ctx) error {
	tmpProject := new(Project)

	if err := c.BodyParser(tmpProject); err != nil {
		fmt.Println(err)
		c.JSON(&fiber.Map{
			"success": false,
			"message": "Error occured",
		})
		return err
	}
	tmpUser := new(User)
	// fmt.Println(tmpProject, tmpUser, tmpProject.UserId)
	res := DB.First(&tmpUser, "id = ?", tmpProject.UserId) // the user from the project and check if it is equal to user id sent in project
	// DB.Model(&User{}).Find(&Map[string]string)
	if res.Error != nil && tmpUser.ID != tmpProject.UserId {
		return c.JSON(&fiber.Map{
			"success": false,
			"message": "user not found",
		})
	}
	fmt.Println(res.RowsAffected, tmpUser)

	DB.Create(&tmpProject)
	return c.JSON(&fiber.Map{
		"success":  true,
		"meassage": "user created",
		"userName": tmpUser.Name,
		"userId":   tmpUser.ID,
	})
}
