package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func LogData() {
	fmt.Println("logging data")
}

func RoutesSetup(app *fiber.App) {

	api := app.Group("/api/user")

	api.Post("/createUser", CreateUser)
	api.Get("/getUser/:id", GetUser)

	api.Post("/createProject", CreateProject)

	api.Post("/createTask", Createtask)

	api.Post("/login", Login)

	api.Post("/getProjects", GetProjects)

}
