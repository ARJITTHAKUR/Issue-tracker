package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	file, err := os.OpenFile("./logs.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer file.Close()
	app.Use(logger.New(logger.Config{
		Output: file,
	}))
	app.Use(cors.New())
	// LogData()

	DbConnectNew()
	// DB.Migrator().DropTable(&User{}, &Project{}, &Task{})
	RoutesSetup(app) // all user routes setups

	app.Listen(":8080")
}
