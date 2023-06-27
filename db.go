package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm/logger"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"gorm.io/gorm"
)

var DB *gorm.DB

func DbConnectNew() {
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second,   // Slow SQL threshold
			LogLevel:                  logger.Silent, // Log level
			IgnoreRecordNotFoundError: true,          // Ignore ErrRecordNotFound error for logger
			ParameterizedQueries:      true,          // Don't include params in the SQL log
			Colorful:                  false,         // Disable color
		},
	)

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")
	user := os.Getenv("USER")
	password := os.Getenv("PASSWORD")
	dbname := os.Getenv("DBNAME")
	// fmt.Println(host, port, user, password, dbname)
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	// dsn := "postgres://postgres:password@localhost:5432/ISSUE_TRACKER?sslmode=disable"
	dsn := connStr
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger:         newLogger,
		TranslateError: true,
	})

	if err != nil {
		panic("failed to connect with ")
	}

	DB = db

	fmt.Println("connected to DB")

	RunAllMigrations()
}
