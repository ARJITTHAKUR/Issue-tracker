package main

import (
	"strconv"
	"time"

	"github.com/go-playground/validator"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"

	"gorm.io/gorm"
	// "gorm.io/gorm"
)

//	type testUser struct {
//		Name string `json:"name"`
//	}
type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
}

type userCreds struct {
	Name string `validate:"required" json:"name"`
}

var validate = validator.New()

func ValidateStruct(user userCreds) []*ErrorResponse {
	var errors []*ErrorResponse

	err := validate.Struct(user)

	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			errors = append(errors, &element)
		}
	}
	return errors
}

func CreateUser(c *fiber.Ctx) error {
	tempUserStruct := User{}

	if err := c.BodyParser(&tempUserStruct); err != nil {
		println(err.Error())
		return err
	}
	// fmt.Printf("json %+v\n", tempUserStruct)
	findErr := DB.Where("name = ?", tempUserStruct.Name).First(&tempUserStruct).Error
	// fmt.Println(findErr)
	if findErr == gorm.ErrRecordNotFound {
		// fmt.Println("not found", findErr)
		newUser := User{
			Name: tempUserStruct.Name,
		}
		createuser := DB.Create(&newUser)
		if createuser.Error != nil {
			return c.Status(fiber.StatusBadRequest).JSON(&fiber.Map{
				"error": createuser.Error.Error(),
			})
		} else {
			return c.Status(fiber.StatusOK).JSON(&fiber.Map{
				"user": newUser,
			})
		}

	} else {
		// fmt.Println("else block")
		return c.JSON(&fiber.Map{
			"error": "User already exsits",
		})
	}

}

func GetUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	// fmt.Println(userID)

	return c.Status(200).JSON(&fiber.Map{
		"userId": userID,
	})
}

func Login(c *fiber.Ctx) error {

	cred := userCreds{}
	// fmt.Println(json.Marshal(c.Body()))
	if err := c.BodyParser(&cred); err != nil {
		return c.JSON(&fiber.Map{
			"message": "parsing error",
			"success": false,
		})
	}
	// fmt.Println("user credentials", cred)
	errors := ValidateStruct(cred)
	if errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(errors)
	}

	userValue := User{}
	DB.Where(&cred).First(&userValue)
	// fmt.Println(userValue, cred)
	if userValue.Name != cred.Name {
		return c.JSON(&fiber.Map{
			"success": false,
			"message": "user not found",
		})
	}

	// Create the Claims
	claims := jwt.MapClaims{
		"name":  "John Doe",
		"admin": true,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte("autobotsRoll"))

	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	return c.JSON(&fiber.Map{
		"success": true,
		"login":   true,
		"token":   t,
		"user": map[string]string{
			"Name": userValue.Name,
			"ID":   strconv.FormatUint(uint64(userValue.ID), 10),
		},
	})

}
