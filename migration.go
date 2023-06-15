package main

import (
	"fmt"
	"log"
)

func UserMigrations() error {
	if res := DB.Migrator().HasTable(&User{}); !res {
		if err := DB.AutoMigrate(&User{}); err != nil {
			log.Fatal(err)
			return err
		}
	}
	return nil
}

func ProjectMigrations() error {
	if res := DB.Migrator().HasTable(&Project{}); !res {
		if err := DB.AutoMigrate(&Project{}); err != nil {
			log.Fatal(err)
			return err
		}
	}
	return nil
}
func TaskMigrations() error {
	if res := DB.Migrator().HasTable(&Task{}); !res {
		if err := DB.AutoMigrate(&Task{}); err != nil {
			log.Fatal(err)
			return err
		}
	}
	return nil
}
func RunAllMigrations() error {
	fmt.Println("running all migrations")

	UserMigrations()
	ProjectMigrations()
	TaskMigrations()

	return nil
}
