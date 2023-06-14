package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm/logger"

	_ "github.com/lib/pq"
	"gorm.io/gorm"
)

const (
	host     = "localhost"
	port     = "5432"
	user     = "postgres"
	password = "password"
	dbname   = "ISSUE_TRACKER"
)

// var DB *sql.DB

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
	dsn := "postgres://postgres:password@localhost:5432/ISSUE_TRACKER?sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})

	if err != nil {
		panic("failed to connect with ")
	}

	DB = db

	fmt.Println("connected to DB")

	RunAllMigrations()
}

func Connect() {
	//postgres://postgres:password@localhost:5432/ISSUE_TRACKER?sslmode=disable
	var err error
	// connectString := "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable"
	dynamicConnString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	fmt.Println(dynamicConnString)
	DB, err := sql.Open("postgres", dynamicConnString)

	if err != nil {
		panic(err)
	}
	defer DB.Close()
	if err := DB.Ping(); err != nil {
		panic(err)
	}
	fmt.Println("DB connected !!")

	println("Testing if tables exsist ?")
	testDBTables()

	// DB.Close()
}

func testDBTables() {

	// 	rows, err := DB.Query(`SELECT FROM
	// 	pg_tables
	// WHERE
	// 	schemaname = 'public' AND
	// 	tablename  = 'user'`)

	// 	// defer rows.Close()clear

	// 	if err != nil {
	// 		fmt.Println("query Error")
	// 		panic(err)
	// 	}

	// 	var res string
	// 	var data []string
	// 	for rows.Next() {
	// 		rows.Scan(&res)
	// 		data = append(data, res)
	// 	}
	// 	fmt.Println(data)

}
