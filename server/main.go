package main

import (
	"fmt"
	"landtick/database"
	"landtick/pkg/mysql"
	"landtick/routes"
	"os"

	// "os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {

	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}

	e := echo.New()

	// untuk mengakses data yg akan dikirimkan ke frontEnd
	// Middleware CORS (Cross-Origin Resource Sharing) digunakan untuk mengizinkan atau membatasi akses dari sebuah sumber daya web (website) pada domain yang berbeda
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	mysql.DatabaseInit()
	database.RunMigration()

	routes.RouteInit(e.Group("/api/v1"))

	e.Static("/uploads", "./uploads")

	var port = os.Getenv("PORT")
	// var port = "5000"

	fmt.Println("Server starting", port)
	e.Logger.Fatal(e.Start("localhost:" + port))

}
