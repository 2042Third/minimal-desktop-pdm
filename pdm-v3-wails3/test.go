package main

import "C"
import (
	"database/sql"
	"fmt"
	"log"
	_ "pdm/pdmsqlite"
	"pdm/services"
)

func main() {
	basicSqlite()

	db := services.NewDatabase()
	db.Open("./test/test.db", "secret")
	defer db.Close()
	db.RunSmallTest()
	db.RunTransactionTest1()
	db.RunQueryTest()
}

func basicSqlite() {
	log.Printf("Begin basicSqlite")
	// Use a DSN in the form "/path/to/db?password=yourpass"
	db, err := sql.Open("pdmsqlite", "./test/test.db?password=secret")
	if err != nil {
		panic(err)
	}
	defer func(db *sql.DB) {
		log.Printf("Closing db, basicSqlite end.")
		err := db.Close()
		if err != nil {
			panic(err)
		}
	}(db)

	// Example Exec: create a table
	_, err = db.Exec("CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, value TEXT)")
	if err != nil {
		panic(err)
	}

	// Example Exec: insert a row
	_, err = db.Exec("INSERT INTO test (value) VALUES ('hello3')")
	if err != nil {
		panic(err)
	}

	//// Example Query: select from the table
	//rows, err := db.Query("SELECT id, value FROM test")
	//if err != nil {
	//	panic(err)
	//}

	// Example Query: prepared statement
	stmt, err := db.Prepare("SELECT id, value FROM test WHERE id > ?")
	if err != nil {
		panic(err)
	}

	rows, err := stmt.Query(1)
	if err != nil {
		panic(err)
	}

	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			panic(err)
		}
	}(rows)

	// Get the column names from your driver implementation.
	columns, err := rows.Columns()
	if err != nil {
		panic(err)
	}
	fmt.Println("Columns:", columns)

	// Since your Rows.Next() puts strings into dest, use []interface{} to receive them.
	for rows.Next() {
		// Create a slice of empty interfaces with enough capacity.
		values := make([]interface{}, len(columns))
		// A temporary slice of pointers that will be used in Scan.
		scanArgs := make([]interface{}, len(columns))
		for i := range values {
			scanArgs[i] = &values[i]
		}

		// Scan the result into the pointers.
		if err := rows.Scan(scanArgs...); err != nil {
			panic(err)
		}

		// Print each row.
		for i, col := range values {
			fmt.Printf("%s: %v  ", columns[i], col)
		}
		fmt.Println()
	}

}
