package services

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v3/pkg/application"
	"gorm.io/gorm"
	"log"
	"pdm/models"
	"pdm/pdmsqlite"
)

type Database struct {
	sqlDB *sql.DB
	db    *gorm.DB
	name  string
}

func NewDatabase() *Database {
	return &Database{}
}
func NewDatabaseWithOptions(path, passwd string) *Database {
	db := &Database{}
	db.Open(path, passwd)
	return db
}

func CellClickCallBack(data *application.Context) (*models.CellInfo, error) {
	cellInfoJSONString, err := convertToString(data.ContextMenuData())
	if err != nil {
		return nil, err
	}
	return parseCellInfo(cellInfoJSONString)
}

func convertToString(value interface{}) (string, error) {
	str, ok := value.(string)
	if !ok {
		return "", fmt.Errorf("value is not a string")
	}
	return str, nil
}

func parseCellInfo(cellInfoJSON string) (*models.CellInfo, error) {
	var cellInfo models.CellInfo
	err := json.Unmarshal([]byte(cellInfoJSON), &cellInfo)
	if err != nil {
		return nil, err
	}
	return &cellInfo, nil
}

func (d *Database) Open(path, passwd string) {

	if d.sqlDB != nil {
		panic("Database already open")
	}

	// Create the SQL DB instance with your custom driver
	sqlDB, err := sql.Open("pdmsqlite", path+"?password="+passwd)
	if err != nil {
		panic(err)
	}
	d.sqlDB = sqlDB
	d.name = path

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

func (d *Database) GetName() string {
	return d.name
}

func (d *Database) GetDB() *gorm.DB {
	return d.db
}

func (d *Database) GetGorm() *gorm.DB {
	return d.db
}

func (d *Database) GetSQL() *sql.DB {
	return d.sqlDB
}

func (d *Database) GetSQLite() *sql.DB {
	return d.sqlDB
}

//func (d *Database) Execute(query string) error {
//	log.Printf("Executing string: %v", query)
//	// Execute the query
//	_, err := d.sqlDB.Exec(query)
//	//_, err := d.sqlDB.Exec("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)")
//	if err != nil {
//		panic(err)
//	}
//
//	return nil
//}

func (d *Database) Execute(query string) error {
	log.Printf("Executing statement: %v", query)

	// Use Prepare and Exec to better handle the statement
	stmt, err := d.sqlDB.Prepare(query)
	if err != nil {
		return fmt.Errorf("failed to prepare statement: %v", err)
	}
	defer stmt.Close()

	_, err = stmt.Exec()
	if err != nil {
		return fmt.Errorf("failed to execute statement: %v", err)
	}

	return nil
}

func (d *Database) ExecuteQuery(query string) models.QueryResult {
	log.Printf("Executing query: %v", query)
	// Execute the query
	rows, err := d.sqlDB.Query(query)
	if err != nil {
		return models.QueryResult{Error: err.Error()}
	}
	defer rows.Close()

	// Get column names
	columns, err := rows.Columns()
	if err != nil {
		return models.QueryResult{Error: err.Error()}
	}

	// Prepare result storage
	result := models.QueryResult{
		Columns: columns,
		Rows:    make([][]interface{}, 0),
	}

	// Prepare containers for row values
	values := make([]interface{}, len(columns))
	scanArgs := make([]interface{}, len(columns))
	for i := range values {
		scanArgs[i] = &values[i]
	}

	// Fetch rows
	for rows.Next() {
		err := rows.Scan(scanArgs...)
		if err != nil {
			return models.QueryResult{Error: err.Error()}
		}

		// Convert row to proper format
		row := make([]interface{}, len(columns))
		for i, v := range values {
			if v == nil {
				row[i] = nil
			} else {
				switch v.(type) {
				case []byte:
					row[i] = string(v.([]byte))
				default:
					row[i] = v
				}
			}
		}
		result.Rows = append(result.Rows, row)
	}

	return result
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
