package pdmsqlite

import "fmt"

// SQLiteDataType SQLite data types (from your first C snippet)
type SQLiteDataType int

const (
	SQLITE_INTEGER SQLiteDataType = 1
	SQLITE_FLOAT   SQLiteDataType = 2
	SQLITE_BLOB    SQLiteDataType = 4
	SQLITE_NULL    SQLiteDataType = 5
	SQLITE_TEXT    SQLiteDataType = 3
	// You can also alias SQLITE3_TEXT if you wish:
	SQLITE3_TEXT SQLiteDataType = 3
)

// Optional: Attach a String() method for easier printing.
func (t SQLiteDataType) String() string {
	switch t {
	case SQLITE_INTEGER:
		return "SQLITE_INTEGER"
	case SQLITE_FLOAT:
		return "SQLITE_FLOAT"
	case SQLITE_BLOB:
		return "SQLITE_BLOB"
	case SQLITE_NULL:
		return "SQLITE_NULL"
	case SQLITE_TEXT:
		return "SQLITE_TEXT"
	default:
		return fmt.Sprintf("Unknown SQLiteDataType (%d)", t)
	}
}

// SQLiteResultCode SQLite result codes (from your second C snippet)
type SQLiteResultCode int

const (
	SQLITE_OK         SQLiteResultCode = 0
	SQLITE_ERROR      SQLiteResultCode = 1
	SQLITE_INTERNAL   SQLiteResultCode = 2
	SQLITE_PERM       SQLiteResultCode = 3
	SQLITE_ABORT      SQLiteResultCode = 4
	SQLITE_BUSY       SQLiteResultCode = 5
	SQLITE_LOCKED     SQLiteResultCode = 6
	SQLITE_NOMEM      SQLiteResultCode = 7
	SQLITE_READONLY   SQLiteResultCode = 8
	SQLITE_INTERRUPT  SQLiteResultCode = 9
	SQLITE_IOERR      SQLiteResultCode = 10
	SQLITE_CORRUPT    SQLiteResultCode = 11
	SQLITE_NOTFOUND   SQLiteResultCode = 12
	SQLITE_FULL       SQLiteResultCode = 13
	SQLITE_CANTOPEN   SQLiteResultCode = 14
	SQLITE_PROTOCOL   SQLiteResultCode = 15
	SQLITE_EMPTY      SQLiteResultCode = 16
	SQLITE_SCHEMA     SQLiteResultCode = 17
	SQLITE_TOOBIG     SQLiteResultCode = 18
	SQLITE_CONSTRAINT SQLiteResultCode = 19
	SQLITE_MISMATCH   SQLiteResultCode = 20
	SQLITE_MISUSE     SQLiteResultCode = 21
	SQLITE_NOLFS      SQLiteResultCode = 22
	SQLITE_AUTH       SQLiteResultCode = 23
	SQLITE_FORMAT     SQLiteResultCode = 24
	SQLITE_RANGE      SQLiteResultCode = 25
	SQLITE_NOTADB     SQLiteResultCode = 26
	SQLITE_NOTICE     SQLiteResultCode = 27
	SQLITE_WARNING    SQLiteResultCode = 28
	SQLITE_ROW        SQLiteResultCode = 100
	SQLITE_DONE       SQLiteResultCode = 101
)

// Again, you can add a String() method to get a human‐readable name.
func (code SQLiteResultCode) String() string {
	switch code {
	case SQLITE_OK:
		return "SQLITE_OK"
	case SQLITE_ERROR:
		return "SQLITE_ERROR"
	case SQLITE_INTERNAL:
		return "SQLITE_INTERNAL"
	case SQLITE_PERM:
		return "SQLITE_PERM"
	case SQLITE_ABORT:
		return "SQLITE_ABORT"
	case SQLITE_BUSY:
		return "SQLITE_BUSY"
	case SQLITE_LOCKED:
		return "SQLITE_LOCKED"
	case SQLITE_NOMEM:
		return "SQLITE_NOMEM"
	case SQLITE_READONLY:
		return "SQLITE_READONLY"
	case SQLITE_INTERRUPT:
		return "SQLITE_INTERRUPT"
	case SQLITE_IOERR:
		return "SQLITE_IOERR"
	case SQLITE_CORRUPT:
		return "SQLITE_CORRUPT"
	case SQLITE_NOTFOUND:
		return "SQLITE_NOTFOUND"
	case SQLITE_FULL:
		return "SQLITE_FULL"
	case SQLITE_CANTOPEN:
		return "SQLITE_CANTOPEN"
	case SQLITE_PROTOCOL:
		return "SQLITE_PROTOCOL"
	case SQLITE_EMPTY:
		return "SQLITE_EMPTY"
	case SQLITE_SCHEMA:
		return "SQLITE_SCHEMA"
	case SQLITE_TOOBIG:
		return "SQLITE_TOOBIG"
	case SQLITE_CONSTRAINT:
		return "SQLITE_CONSTRAINT"
	case SQLITE_MISMATCH:
		return "SQLITE_MISMATCH"
	case SQLITE_MISUSE:
		return "SQLITE_MISUSE"
	case SQLITE_NOLFS:
		return "SQLITE_NOLFS"
	case SQLITE_AUTH:
		return "SQLITE_AUTH"
	case SQLITE_FORMAT:
		return "SQLITE_FORMAT"
	case SQLITE_RANGE:
		return "SQLITE_RANGE"
	case SQLITE_NOTADB:
		return "SQLITE_NOTADB"
	case SQLITE_NOTICE:
		return "SQLITE_NOTICE"
	case SQLITE_WARNING:
		return "SQLITE_WARNING"
	case SQLITE_ROW:
		return "SQLITE_ROW"
	case SQLITE_DONE:
		return "SQLITE_DONE"
	default:
		return fmt.Sprintf("Unknown SQLiteResultCode (%d)", code)
	}
}
