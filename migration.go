package main

import (
	"errors"
	"fmt"
	"log"

	"gorm.io/gorm"
)

func UserMigrations() {
	// if res := DB.Migrator().HasTable(&User{}); !res {
	// 	if err := DB.AutoMigrate(&User{}); err != nil {
	// 		log.Fatal(err)
	// 		return err
	// 	}
	// }
	// return nil
	if err := DB.AutoMigrate(&User{}); err == nil && DB.Migrator().HasTable(&User{}) {
		if err := DB.First(&User{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			err := DB.Save(&User{Name: "user1"}).Error
			if err != nil {
				panic(err.Error())
			}
		}
	}
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

func MigrationObjectArray() {

}
