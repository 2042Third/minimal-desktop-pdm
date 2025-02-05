package services

import (
	"database/sql"
	"fmt"
	"gorm.io/gorm"
	"pdm/models"
	"pdm/pdmsqlite"
)

type Database struct {
	sqlDB *sql.DB
	db    *gorm.DB
}

func NewDatabase() *Database {
	return &Database{}
}

func (d *Database) Open(path, passwd string) {
	// Create the SQL DB instance with your custom driver
	sqlDB, err := sql.Open("pdmsqlite", path+"?password="+passwd)
	if err != nil {
		panic(err)
	}
	d.sqlDB = sqlDB

	// Create a new GORM DB instance
	db, err := gorm.Open(&pdmsqlite.Dialector{
		DriverName: "pdmsqlite",
		DSN:        "./test/test.db?password=secret",
		Conn:       sqlDB,
	}, &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	d.db = db

}

func (d *Database) Close() {
	if d.sqlDB != nil {
		err := d.sqlDB.Close()
		if err != nil {
			panic(err)
		}
	}
}

func (d *Database) GetDB() *gorm.DB {
	return d.db
}

func (d *Database) RunSmallTest() {
	db := d.GetDB()

	// Migrate the schema
	err := db.AutoMigrate(&models.User{})
	if err != nil {
		panic("failed to migrate database")
	}
	fmt.Printf("Migrated schema")

	// Create
	db.Create(&models.User{Name: "John Doe", Email: "john@example.com"})
	fmt.Printf("Created user")

	// Read
	var user models.User
	db.First(&user, "name = ?", "John Doe") // find first user with name John Doe
	fmt.Printf("Found user: %v\n", user)

	// Update
	db.Model(&user).Update("Name", "Jane Doe")
	fmt.Printf("Updated user: %v\n", user)

	// Read All
	var users []models.User
	result := db.Find(&users)
	fmt.Printf("Found %d users\n", result.RowsAffected)
	for _, u := range users {
		fmt.Printf("User: %v\n", u)
	}

	// Delete
	db.Delete(&user)
	fmt.Printf("Deleted user: %v\n", user)
}
