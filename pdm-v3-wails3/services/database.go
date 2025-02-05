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

func (d *Database) RunTransactionTest1() {
	db := d.GetDB()

	// Transaction example
	err := db.Transaction(func(tx *gorm.DB) error {
		// Create user within transaction
		if err := tx.Create(&models.User{
			Name:  "Transaction User",
			Email: "trans@example.com",
		}).Error; err != nil {
			// Return error will rollback
			return err
		}

		// Create another record within the same transaction
		if err := tx.Create(&models.User{
			Name:  "Another User",
			Email: "another@example.com",
		}).Error; err != nil {
			// Return error will rollback
			return err
		}

		// Return nil will commit the whole transaction
		return nil
	})

	if err != nil {
		fmt.Printf("Transaction failed: %v\n", err)
	} else {
		fmt.Println("Transaction successful")
	}

}

func (d *Database) RunQueryTest() {
	db := d.GetDB()

	fmt.Printf("Running Query Test\n")

	// Using where conditions
	var users []models.User
	db.Where("name LIKE ?", "%John%").Find(&users)

	// Check the result
	for _, u := range users {
		fmt.Printf("User: %v\n", u)
	}
	fmt.Printf("Running Query Test 2\n")

	// Using order
	db.Order("name desc").Find(&users)

	// Check the result
	for _, u := range users {
		fmt.Printf("User: %v\n", u)
	}

	fmt.Printf("Running Query Test 3\n")
	// Using limit
	db.Limit(10).Find(&users)

	// Check the result
	for _, u := range users {
		fmt.Printf("User: %v\n", u)
	}

	fmt.Printf("Running Query Test 4\n")
	// Combining multiple conditions
	db.Where("name LIKE ?", "%John%").
		Or("email LIKE ?", "%example.com%").
		Order("created_at desc").
		Limit(10).
		Find(&users)

	// Check the result
	for _, u := range users {
		fmt.Printf("User: %v\n", u)
	}

	fmt.Printf("Query Test End.\n")
}
