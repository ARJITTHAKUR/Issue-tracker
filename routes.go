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

	app.Static("/", "./client/issue_tracker/dist")
	app.Use(func(c *fiber.Ctx) error {
		if c.Path() == "/api" || strings.HasPrefix(c.Path(), "/api/") {
			// Pass the request to the API endpoints
			return c.Next()
		}
		return c.SendFile("./client/issue_tracker/dist/index.html")
	})
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

	// api.Get("/getUserProjectData/:id",)

}

func frontendHandler() {

}
