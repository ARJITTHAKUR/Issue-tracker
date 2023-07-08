package main

import (
	"database/sql"
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
	// dsn := "postgres://postgres:password@localhost:5432/ISSUE_TRACKER?sslmode=disable"
	connStr := fmt.Sprintf("host=%s port=%s user=%s password=%s sslmode=disable", host, port, user, password)

	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		fmt.Print(err.Error())
		panic("failed to connect with postgres and create table")
	}

	// bol, err := databaseExists(db.DB(),"ISSUE_TRACKER")
	var count int64
	db.Raw("SELECT COUNT(*) FROM pg_database WHERE datname = ?", "ISSUE_TRACKER").Scan(&count)
	if count == 0 {
		err = db.Exec("CREATE DATABASE ISSUE_TRACKER").Error

		if err != nil {
			panic("failed to create database!")
		}
	}

	connStr = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	dsn := connStr
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger:         newLogger,
		TranslateError: true,
	})

	if err != nil {
		fmt.Print(err.Error())
		panic("failed to connect with with database name")
	}

	fmt.Println("Database exists and connected")

	DB = db

	fmt.Println("connected to DB")

	RunAllMigrations()
}

func databaseExists(db *sql.DB, name string) (bool, error) {
	var exists bool
	err := db.QueryRow("SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = $1)", name).Scan(&exists)
	if err != nil {
		return false, err
	}
	return true, nil
}
