package pdmsqlite

/*
#cgo LDFLAGS: -L${SRCDIR}/../Frameworks  -Wl,-rpath,${SRCDIR}/../Frameworks  -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite/install/bin -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite/install/lib  -L${SRCDIR}/../pdm/encrypted-sqlite/build -L${SRCDIR}/../pdm/encrypted-sqlite/install/lib -L${SRCDIR}/../pdm/encrypted-sqlite -L${SRCDIR}/../pdm/encrypted-sqlite -L${SRCDIR}/../pdm/encrypted-sqlite -L${SRCDIR}/../pdm/encrypted-sqlite/build/lib/cryptoSQLite -L${SRCDIR}/../pdm/encrypted-sqlite -lwrapper -lencrypted_sqlite -lcryptosqlite -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite/build -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite/build/lib/cryptoSQLite -Wl,-rpath,${SRCDIR}/../pdm/encrypted-sqlite -lstdc++

#cgo CXXFLAGS: -std=c++20
#cgo CFLAGS: -I${SRCDIR}/../pdm/encrypted-sqlite -I${SRCDIR}/../pdm/encrypted-sqlite/install/include -I${SRCDIR}

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
	"net/url"
	"strings"
	"time"
	"unsafe"
)

func init() {
	sql.Register("pdmsqlite", &Driver{})
}

// Driver implements database/sql/driver.Driver.
type Driver struct{}

// Conn represents a connection to the encrypted database.
type Conn struct {
	db *C.PDMDatabase
}

// Stmt represents a prepared statement.
type Stmt struct {
	conn *Conn
	sql  string
	stmt *C.PDMStatement // Add this to store the prepared statement
}

// Rows holds an active result set.
type Rows struct {
	// The prepared statement used to step through the result rows.
	stmt *C.PDMStatement
	// Number of columns in the result.
	cols int
	// Indicates that we've reached the end.
	done bool
}

type SQLiteTx struct {
	conn *Conn
}

type SQLiteResult struct {
	rowsAffected int64
	lastInsertId int64
}

// DSN holds the parsed data source name.
type DSN struct {
	Path     string
	Password string
}

// parseDSN parses a DSN string in the format "/path/to/db?password=secretpass"
// and extracts the database path and password.
func parseDSN(dsn string) (*DSN, error) {
	if dsn == "" {
		return nil, fmt.Errorf("dsn cannot be empty")
	}

	parts := strings.SplitN(dsn, "?", 2)
	path := parts[0]
	if path == "" {
		return nil, fmt.Errorf("invalid DSN: missing database path")
	}

	parsedDSN := &DSN{Path: path}
	if len(parts) == 2 {
		queryStr := parts[1]
		values, err := url.ParseQuery(queryStr)
		if err != nil {
			return nil, fmt.Errorf("failed to parse query parameters: %w", err)
		}
		parsedDSN.Password = values.Get("password")
	}

	return parsedDSN, nil
}

// Open opens a new database connection.
func (d *Driver) Open(dsn string) (driver.Conn, error) {
	parsed, err := parseDSN(dsn)
	if err != nil {
		return nil, err
	}

	cPath := C.CString(parsed.Path)
	cPassword := C.CString(parsed.Password)
	passwordLen := C.int(len(parsed.Password))
	defer C.free(unsafe.Pointer(cPath))
	defer C.free(unsafe.Pointer(cPassword))

	db := C.pdm_db_open(cPath, cPassword, passwordLen)
	if db == nil {
		return nil, errors.New("failed to open database")
	}

	return &Conn{db: db}, nil
}

// Prepare returns a new prepared statement.
func (c *Conn) Prepare(query string) (driver.Stmt, error) {
	cQuery := C.CString(query)
	defer C.free(unsafe.Pointer(cQuery))

	stmt := C.pdm_db_prepare(c.db, cQuery)
	if stmt == nil {
		return nil, fmt.Errorf("failed to prepare statement: %s", getLastError(c.db))
	}

	return &Stmt{
		conn: c,
		sql:  query,
		stmt: stmt,
	}, nil
}

// Close closes the connection.
func (c *Conn) Close() error {
	if c.db != nil {
		// Passing nil for the path here; adjust if needed.
		C.pdm_db_close(c.db, nil)
		c.db = nil
	}
	return nil
}

// Begin starts a transaction.
func (c *Conn) Begin() (driver.Tx, error) {
	if rv := C.pdm_db_begin(c.db); SQLiteResultCode(rv) != SQLITE_OK {
		return nil, errors.New("failed to begin transaction")
	}
	return &SQLiteTx{c}, nil
}

// Commit commits the transaction.
func (tx *SQLiteTx) Commit() error {
	if rv := C.pdm_db_commit(tx.conn.db); SQLiteResultCode(rv) != SQLITE_OK {
		return errors.New("failed to commit transaction")
	}
	return nil
}

// Rollback rolls back the transaction.
func (tx *SQLiteTx) Rollback() error {
	if rv := C.pdm_db_rollback(tx.conn.db); SQLiteResultCode(rv) != SQLITE_OK {
		return errors.New("failed to rollback transaction")
	}
	return nil
}

// Close properly finalizes the prepared statement.
func (s *Stmt) Close() error {
	if s.stmt != nil {
		if rc := C.pdm_db_finalize(s.stmt); SQLiteResultCode(rc) != SQLITE_OK {
			return fmt.Errorf("error finalizing statement: %s", getLastError(s.conn.db))
		}
		s.stmt = nil
	}
	return nil
}

// NumInput returns -1 indicating that the number of placeholders is not fixed.
func (s *Stmt) NumInput() int {
	return -1
}

// bindArgs binds the provided arguments to the prepared statement.
func bindArgs(stmt *C.PDMStatement, args []driver.Value) error {
	for i, arg := range args {
		pos := i + 1 // SQLite binding positions are 1-based
		var rc C.int

		switch v := arg.(type) {
		case nil:
			rc = C.pdm_db_bind_null(stmt, C.int(pos))
		case int64:
			rc = C.pdm_db_bind_int64(stmt, C.int(pos), C.int64_t(v))
		case float64:
			rc = C.pdm_db_bind_double(stmt, C.int(pos), C.double(v))
		case bool:
			val := 0
			if v {
				val = 1
			}
			rc = C.pdm_db_bind_int(stmt, C.int(pos), C.int(val))
		case []byte:
			if len(v) > 0 {
				rc = C.pdm_db_bind_blob(stmt, C.int(pos), unsafe.Pointer(&v[0]), C.int(len(v)))
			} else {
				rc = C.pdm_db_bind_blob(stmt, C.int(pos), nil, 0)
			}
		case time.Time:
			cstr := C.CString(v.Format(time.RFC3339))
			defer C.free(unsafe.Pointer(cstr))
			rc = C.pdm_db_bind_text(stmt, C.int(pos), cstr)
		default:
			return fmt.Errorf("unsupported type for binding: %T", arg)
		}

		if SQLiteResultCode(rc) != SQLITE_OK {
			return fmt.Errorf("error binding parameter %d: %v", i, SQLiteResultCode(rc))
		}
	}
	return nil
}

// Exec executes a prepared statement with the given arguments.
func (s *Stmt) Exec(args []driver.Value) (driver.Result, error) {
	if s.stmt == nil {
		return nil, errors.New("statement was closed or not properly prepared")
	}

	// Reset the statement for reuse
	if rc := C.pdm_db_reset(s.stmt); SQLiteResultCode(rc) != SQLITE_OK {
		return nil, fmt.Errorf("failed to reset statement: %s", getLastError(s.conn.db))
	}

	// Bind parameters
	if err := bindArgs(s.stmt, args); err != nil {
		return nil, fmt.Errorf("failed to bind arguments: %w", err)
	}

	// Execute the statement
	var rowsAffected int64
	var lastInsertId int64

	for {
		rc := SQLiteResultCode(C.pdm_db_step(s.stmt))
		switch rc {
		case SQLITE_DONE:
			// Get the number of rows affected and last insert ID
			rowsAffected = int64(C.pdm_db_changes(s.conn.db))
			lastInsertId = int64(C.pdm_db_last_insert_rowid(s.conn.db))
			return &SQLiteResult{
				rowsAffected: rowsAffected,
				lastInsertId: lastInsertId,
			}, nil
		case SQLITE_ROW:
			// This shouldn't happen for Exec, but handle it anyway
			continue
		case SQLITE_BUSY:
			// Consider implementing retry logic here
			return nil, fmt.Errorf("database is busy")
		default:
			return nil, fmt.Errorf("execution failed: %s", getLastError(s.conn.db))
		}
	}
}

// Query prepares, binds, and returns a Rows object for queries.
func (s *Stmt) Query(args []driver.Value) (driver.Rows, error) {
	cQuery := C.CString(s.sql)
	defer C.free(unsafe.Pointer(cQuery))
	stmt := C.pdm_db_prepare(s.conn.db, cQuery)
	if stmt == nil {
		return nil, errors.New("failed to prepare statement")
	}
	if err := bindArgs(stmt, args); err != nil {
		C.pdm_db_finalize(stmt)
		return nil, err
	}
	cols := int(C.pdm_db_column_count(stmt))
	return &Rows{
		stmt: stmt,
		cols: cols,
		done: false,
	}, nil
}

// Columns returns the names of the columns.
func (r *Rows) Columns() []string {
	columns := make([]string, r.cols)
	for i := 0; i < r.cols; i++ {
		cname := C.pdm_db_column_name(r.stmt, C.int(i))
		columns[i] = C.GoString(cname)
	}
	return columns
}

// Close finalizes the prepared statement.
func (r *Rows) Close() error {
	if r.stmt != nil {
		C.pdm_db_finalize(r.stmt)
		r.stmt = nil
	}
	return nil
}

// Next advances to the next row in the result set.
// It uses SQLite’s column type functions to return appropriate Go types.
func (r *Rows) Next(dest []driver.Value) error {
	if r.done {
		return io.EOF
	}
	rc := C.pdm_db_step(r.stmt)
	switch SQLiteResultCode(rc) {
	case SQLITE_ROW:
		for i := 0; i < r.cols; i++ {
			colType := C.pdm_db_column_type(r.stmt, C.int(i))
			var val driver.Value
			switch SQLiteDataType(colType) {
			case SQLITE_INTEGER:
				val = int64(C.pdm_db_column_int64(r.stmt, C.int(i)))
			case SQLITE_FLOAT:
				val = float64(C.pdm_db_column_double(r.stmt, C.int(i)))
			case SQLITE_TEXT:
				text := C.pdm_db_column_text(r.stmt, C.int(i))
				if text != nil {
					textStr := C.GoString((*C.char)(text))
					// Try to parse as timestamp if the column name suggests it's a timestamp
					colName := strings.ToLower(C.GoString(C.pdm_db_column_name(r.stmt, C.int(i))))
					if strings.Contains(colName, "at") || strings.Contains(colName, "date") || strings.Contains(colName, "time") {
						if t, err := time.Parse("2006-01-02 15:04:05.999", textStr); err == nil {
							val = t
						} else {
							val = textStr
						}
					} else {
						val = textStr
					}
				} else {
					val = ""
				}
			case SQLITE_BLOB:
				size := int(C.pdm_db_column_bytes(r.stmt, C.int(i)))
				blob := C.GoBytes(unsafe.Pointer(C.pdm_db_column_blob(r.stmt, C.int(i))), C.int(size))
				val = blob
			case SQLITE_NULL:
				val = nil
			default:
				val = nil
			}
			dest[i] = val
		}
		return nil
	case SQLITE_DONE:
		r.done = true
		return io.EOF
	default:
		return fmt.Errorf("error stepping through results: %d", int(rc))
	}
}

func (r *SQLiteResult) LastInsertId() (int64, error) {
	return r.lastInsertId, nil
}

func (r *SQLiteResult) RowsAffected() (int64, error) {
	return r.rowsAffected, nil
}

// Helper function to get the last error from SQLite
func getLastError(db *C.PDMDatabase) string {
	if errMsg := C.pdm_db_errmsg(db); errMsg != nil {
		return C.GoString(errMsg)
	}
	return "unknown error"
}
