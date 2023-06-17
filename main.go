package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())
	// LogData()

	DbConnectNew()

	RoutesSetup(app) // all user routes setups

	app.Listen(":3000")
}
