package main

import (
	"fmt"
	"log"
	"strconv"

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
	//check db is if the user exists
	// check db if project with this name already exists
	var user User
	user.ID = tmpProject.UserId
	userRes := DB.First(&user)

	if userRes.Error != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("user not found")
	}
	if userRes.RowsAffected == 1 && user.ID != tmpProject.UserId {
		return c.Status(fiber.StatusInternalServerError).SendString("this project doesn't belong to this user")
	}

	// now check to see if the project name exists
	project := Project{Name: tmpProject.Name, UserId: tmpProject.UserId, StartDate: tmpProject.StartDate, EndDate: tmpProject.EndDate}
	result := DB.Create(&project)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"error": result.Error.Error()})
	} else {
		return c.Status(fiber.StatusOK).JSON(&fiber.Map{"message": "project created", "project": project})
	}

}

func GetProjects(c *fiber.Ctx) error {
	id := c.Params("id")
	fmt.Println("id : => ", id)
	var projects []Project
	// err := DB.Debug().Where("user_id <> ?", string(id)).Find(&projects).Error
	err := DB.Raw("SELECT * FROM projects WHERE user_id = ?", id).Scan(&projects).Error

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"projects": projects,
	})
}

func DeleteProject(c *fiber.Ctx) error {
	// get id
	projectId, err := strconv.Atoi(c.Params("id"))

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("error occured")
	}
	project := Project{ID: uint(projectId)}
	deleteErr := DB.Debug().Delete(&project).Error

	if deleteErr != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(deleteErr.Error())
	}

	var projects []Project
	findError := DB.Raw("SELECT * FROM projects WHERE id = ?", projectId).Scan(&projects).Error

	if findError != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(&fiber.Map{"err": findError.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(&fiber.Map{
		"projects": projects,
	})
	// return c.Status(fiber.StatusOK).SendString("project deleted")
}

func GetUsersProjectData(c *fiber.Ctx) error {
	userId, err := strconv.Atoi(c.Params("id"))
	fmt.Println("api hit")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	// user := User{ID: uint(userId)}
	// var data []struct {
	// 	name  string
	// 	tasks []Task
	// }
	rows, err := DB.Debug().Raw("SELECT projects.name, tasks.description FROM users JOIN projects ON users.id = projects.user_id JOIN tasks ON projects.id = tasks.project_id WHERE users.id = ?", uint(userId)).Rows()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}
	// type resData struct {
	// 	Name        string `json:"project"`
	// 	Description string `json:"taskDescription"`
	// }
	// var tasks []resData

	var projectWiseTasks = make(map[string][]string)

	for rows.Next() {
		// var data resData
		// err = rows.Scan(&data.Name, &data.Description)
		var projectName, taskName string
		err = rows.Scan(&projectName, &taskName)

		if err != nil {
			log.Fatal(err.Error())
			return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
		}
		// tasks = append(tasks, data)

		projectWiseTasks[projectName] = append(projectWiseTasks[projectName], taskName)
	}

	// fmt.Printf("%+v\n", projectWiseTasks)
	// for _, data := range tasks {
	// 	fmt.Printf("%+v\n", data)
	// }
	// jsonRes, err := json.Marshal(tasks)
	// if err != nil {
	// 	return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	// }
	return c.JSON(&fiber.Map{
		"tasks": projectWiseTasks,
	})

}
