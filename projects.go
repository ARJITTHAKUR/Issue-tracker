package main

import (
	"fmt"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
)

type project struct {
	Name string `validate:"required" json:"projectName"`
}

var projectValidate = validator.New()

func validateStruct(project Project) []*ErrorResponse {
	var errors []*ErrorResponse

	err := projectValidate.Struct(project)

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
func CreateProject(c *fiber.Ctx) error {
	tmpProject := Project{}

	if err := c.BodyParser(&tmpProject); err != nil {
		fmt.Println(err)
		return c.JSON(&fiber.Map{
			"success": false,
			"message": "Error occured",
			"error":   err.Error(),
		})
		// return err
	}

	// check for validation errors
	errors := validateStruct(tmpProject)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	// check if the project queried has same user id
	tmpUser := new(User)
	res := DB.First(&tmpUser, "id = ?", tmpProject.UserId) // the user from the project and check if it is equal to user id sent in project
	if res.Error != nil && tmpUser.ID != tmpProject.UserId {
		return c.JSON(&fiber.Map{
			"success": false,
			"message": "user not found",
		})
	}
	fmt.Println(res.RowsAffected, tmpUser)

	// check duplicate project
	var exist bool = false
	existError := DB.
		Model(Project{}).
		Select("count(*)>0").
		Where("name = ?", tmpProject.Name).
		Find(&exist).Error

	if exist || existError != nil {
		fmt.Println(existError)
		fmt.Println("exist==>", exist)
		return c.JSON(&fiber.Map{
			"message": "project already exsists",
			"success": false,
		})
	}
	DB.Create(&tmpProject)
	return c.JSON(&fiber.Map{
		"success":  true,
		"meassage": "project created",
		"userName": tmpUser.Name,
		"userId":   tmpUser.ID,
		"project":  tmpProject,
	})
}

func GetProjects(c *fiber.Ctx) error {
	user := User{}

	if err := c.BodyParser(&user); err != nil {
		return err
	}
	// dbUser := User{}
	project := []Project{}
	DB.Find(&project).Where("id <> ?", user.ID)
	// if user.ID != project {
	// 	c.SendString("incorrect user")
	// }
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"projects": project,
		"user":     user,
	})
}
