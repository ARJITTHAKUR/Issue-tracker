package main

import (
	"encoding/json"
	"fmt"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	// "gorm.io/gorm"
)

//	type testUser struct {
//		Name string `json:"name"`
//	}
type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

type userCreds struct {
	Name string `validate:"required" json:"name"`
}

var validate = validator.New()

func ValidateStruct(user userCreds) []*ErrorResponse {
	var errors []*ErrorResponse

	err := validate.Struct(user)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

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

	cred := userCreds{}
	fmt.Println(json.Marshal(c.Body()))
	if err := c.BodyParser(&cred); err != nil {
		return c.JSON(&fiber.Map{
			"message": "parsing error",
			"success": false,
		})
	}
	fmt.Println("user credentials", cred)
	errors := ValidateStruct(cred)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}
	type user struct {
		Name string
	}
	userValue := user{}
	DB.Where(&cred).First(&userValue)
	fmt.Println(userValue, cred)
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
