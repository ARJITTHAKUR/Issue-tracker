package main

import (
	"fmt"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func LogData() {
	fmt.Println("logging data")
}

func RoutesSetup(app *fiber.App) {

	// app.Static("/", "./client/issue_tracker/dist")
	app.Static("/tasktracker", "./dist")

	task_tracker := app.Group("/tasktracker")
	task_tracker.Use(func(c *fiber.Ctx) error {
		if c.Path() == "/tasktracker/api" || strings.HasPrefix(c.Path(), "/tasktracker/api/") {
			// Pass the request to the API endpoints
			return c.Next()
		}
		// return c.SendFile("./client/issue_tracker/dist/index.html")
		return c.SendFile("./dist/index.html")

	})
	api := task_tracker.Group("/api/user")

	api.Post("/createUser", CreateUser)
	api.Get("/getUser/:id", GetUser)

	api.Post("/createProject", CreateProject)

	api.Post("/createTask", Createtask)

	api.Post("/login", Login)

	api.Get("/getProjects/:id", GetProjects)

	api.Get("/getTasks/:id", GetTasks)

	api.Put("/deleteProject/:id", DeleteProject)

	api.Put("/changeTaskStatus/:status/:id", ChangeStatus)

	api.Get("/getUserProjectData/:id", GetUsersProjectData)

}

func frontendHandler() {

}
