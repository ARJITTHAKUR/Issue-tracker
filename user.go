package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	// "gorm.io/gorm"
)

// type testUser struct {
// 	Name string `json:"name"`
// }

func CreateUser(c *fiber.Ctx) error {
	tempUserStruct := &User{}

	if err := c.BodyParser(tempUserStruct); err != nil {
		println(err.Error())
		return err
	}
	fmt.Println(tempUserStruct)
	DB.Create(&tempUserStruct)
	return c.SendString("User created")
}

func GetUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	fmt.Println(userID)

	return c.Status(200).JSON(&fiber.Map{
		"userId": userID,
	})
}

func Login(c *fiber.Ctx) error {
	type userCreds struct {
		Name string
	}

	cred := userCreds{}

	if err := c.BodyParser(&cred); err != nil {
		return c.JSON(&fiber.Map{
			"message": "parsing error",
			"success": false,
		})
	}

	type user struct {
		Name string
	}
	userValue := user{}
	DB.Where(&cred).First(&userValue)

	if userValue.Name != cred.Name {
		return c.JSON(&fiber.Map{
			"success": false,
			"message": "user not found",
		})
	}
	return c.JSON(&fiber.Map{
		"success": true,
		"login":   true,
		"user":    userValue,
	})

}
