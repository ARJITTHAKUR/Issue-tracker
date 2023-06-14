package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	// LogData()

	DbConnectNew()

	RoutesSetup(app) // all user routes setups

	app.Listen(":3000")
}
