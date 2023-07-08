package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func LogData() {
	fmt.Println("logging data")
}

func RoutesSetup(app *fiber.App) {

	app.Static("/", "./client/issue_tracker/dist")

	api := app.Group("/api/user")

	api.Post("/createUser", CreateUser)
	api.Get("/getUser/:id", GetUser)

	api.Post("/createProject", CreateProject)

	api.Post("/createTask", Createtask)

	api.Post("/login", Login)

	api.Get("/getProjects/:id", GetProjects)

	api.Get("/getTasks/:id", GetTasks)

	api.Put("/deleteProject/:id", DeleteProject)

	api.Put("/changeTaskStatus/:status/:id", ChangeStatus)

	// api.Put("/changeTaskStatus/inprogress/:id", ChangeStatus)

	// api.Put("/changeTaskStatus/completed/:id", ChangeStatus)

}
