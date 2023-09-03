package main

import (
	"fmt"
	"strings"

	jwtware "github.com/gofiber/contrib/jwt"
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
		if c.Path() == "/tasktracker/api" || strings.HasPrefix(c.Path(), "/tasktracker/api/") || c.Path() == "/tasktracker/login" {
			// Pass the request to the API endpoints
			return c.Next()
		}
		// return c.SendFile("./client/issue_tracker/dist/index.html")
		return c.SendFile("./dist/index.html")

	})

	app.Post("/tasktracker/login", Login)
	api := task_tracker.Group("/api/user")
	// JWT Middleware
	api.Use(jwtware.New(jwtware.Config{
		SigningKey: jwtware.SigningKey{Key: []byte("autobotsRoll")},
	}))
	api.Post("/createUser", CreateUser)
	api.Get("/getUser/:id", GetUser)

	api.Post("/createProject", CreateProject)

	api.Post("/createTask", Createtask)

	// api.Post("/login", Login)

	api.Get("/getProjects/:id", GetProjects)

	api.Get("/getTasks/:id", GetTasks)

	api.Put("/deleteProject/:id", DeleteProject)

	api.Put("/changeTaskStatus/:status/:id", ChangeStatus)

	api.Get("/getUserProjectData/:id", GetUsersProjectData)

}

func frontendHandler() {

}
