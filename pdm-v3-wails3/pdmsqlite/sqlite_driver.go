package pdmsqlite

/*
#cgo LDFLAGS: -L${SRCDIR}/../pdm/encrypted-sqlite/build -L${SRCDIR}/../pdm/encrypted-sqlite -L${SRCDIR}/../pdm/encrypted-sqlite -L${SRCDIR}/../pdm/encrypted-sqlite/build/lib/cryptoSQLite -L${SRCDIR}/../pdm/encrypted-sqlite -lwrapper -lencrypted_sqlite -lcryptosqlite -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite/build -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite/build/lib/cryptoSQLite -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite -lstdc++

#cgo CXXFLAGS: -std=c++20
#cgo CFLAGS: -I${SRCDIR}/../pdm/encrypted-sqlite -I${SRCDIR}

#include "wrapper.h"
#include <stdlib.h>
*/
import "C"
import (
	"database/sql"
	"database/sql/driver"
	"errors"
	"fmt"
	"io"
	"log"
	"net/url"
	"strings"
	"unsafe"
)

type Driver struct{}

type Conn struct {
	db *C.PDMDatabase
}

type Stmt struct {
	conn *Conn
	sql  string
}

type Rows struct {
	stmt   *Stmt
	result *C.PDMReturnTable
	curr   int
}

func init() {
	sql.Register("pdmsqlite", &Driver{})
}

type DSN struct {
	Path     string
	Password string
}

// parseDSN parses a DSN string in the format "/path/to/db?password=secretpass".
// It extracts the file path and the password from the query parameters.
func parseDSN(dsn string) (*DSN, error) {
	if dsn == "" {
		return nil, fmt.Errorf("dsn cannot be empty")
	}

	// Split the DSN into the path and the query string.
	parts := strings.SplitN(dsn, "?", 2)
	path := parts[0]
	if path == "" {
		return nil, fmt.Errorf("invalid DSN: missing database path")
	}

	// Initialize the DSN struct with the parsed path.
	parsedDSN := &DSN{
		Path: path,
	}

	// If there is a query part, parse it to extract parameters.
	if len(parts) == 2 {
		queryStr := parts[1]
		values, err := url.ParseQuery(queryStr)
		if err != nil {
			return nil, fmt.Errorf("failed to parse query parameters: %w", err)
		}
		// Extract the "password" parameter.
		parsedDSN.Password = values.Get("password")
	}

	return parsedDSN, nil
}

func (d *Driver) Open(dsn string) (driver.Conn, error) {
	parsed, err := parseDSN(dsn)
	if err != nil {
		return nil, err
	}

	path := C.CString(parsed.Path)
	password := C.CString(parsed.Password)
	passwordLen := C.int(len(parsed.Password))

	defer C.free(unsafe.Pointer(path))
	defer C.free(unsafe.Pointer(password))

	db := C.pdm_db_open(path, password, passwordLen)
	if db == nil {
		return nil, errors.New("failed to open database")
	}

	return &Conn{db: db}, nil
}

// Prepare Connection implementation
func (c *Conn) Prepare(query string) (driver.Stmt, error) {
	return &Stmt{conn: c, sql: query}, nil
}

func (c *Conn) Close() error {
	if c.db != nil {
		C.pdm_db_close(c.db, nil)
		c.db = nil
	}
	return nil
}

func (c *Conn) Begin() (driver.Tx, error) {
	// Implement transaction logic
	return nil, errors.New("transactions not implemented")
}

// Close Statement implementation
func (s *Stmt) Close() error {
	return nil
}

func (s *Stmt) NumInput() int {
	return -1
}

func (s *Stmt) Exec(args []driver.Value) (driver.Result, error) {
	query := C.CString(s.sql)
	defer C.free(unsafe.Pointer(query))

	result := C.pdm_db_execute(s.conn.db, query)
	if result == 0 { // execution failed
		return nil, errors.New("execution failed")
	}

	// If you want to return rows affected, you could query that here.
	return driver.RowsAffected(0), nil
}

func (s *Stmt) Query(args []driver.Value) (driver.Rows, error) {
	query := C.CString(s.sql)
	defer C.free(unsafe.Pointer(query))

	log.Printf("Query: %s", s.sql)

	if C.pdm_db_execute(s.conn.db, query) == 0 { // execution failed
		return nil, errors.New("query execution failed")
	}

	result := C.pdm_db_get_result(s.conn.db)
	if result == nil {
		return nil, errors.New("failed to get result")
	}

	return &Rows{
		stmt:   s,
		result: result,
		curr:   0,
	}, nil
}

// Columns Rows implementation
func (r *Rows) Columns() []string {
	colCount := int(C.pdm_db_get_column_count(r.result))
	columns := make([]string, colCount)

	for i := 0; i < colCount; i++ {
		cname := C.pdm_db_get_column_name(r.result, C.int(i))
		columns[i] = C.GoString(cname)
	}

	return columns
}

func (r *Rows) Close() error {
	if r.result != nil {
		C.pdm_db_free_result(r.result)
		r.result = nil
	}
	return nil
}

func (r *Rows) Next(dest []driver.Value) error {
	if r.curr >= int(C.pdm_db_get_row_count(r.result)) {
		return io.EOF
	}

	colCount := int(C.pdm_db_get_column_count(r.result))
	for i := 0; i < colCount; i++ {
		cvalue := C.pdm_db_get_cell_data(r.result, C.int(r.curr), C.int(i))
		dest[i] = C.GoString(cvalue)
	}

	r.curr++
	return nil
}
