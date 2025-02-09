package models

// SQLiteResult implements driver.Result

type QueryResult struct {
	Columns []string        `json:"columns"`
	Rows    [][]interface{} `json:"rows"`
	Error   string          `json:"error"`
}

type CellInfo struct {
	TableName  string `json:"table"`
	RowID      int    `json:"rowid"`
	ColumnName string `json:"column"`
}

type SQLiteResultOutput struct {
	RowsAffected int64  `json:"rowsAffected"`
	LastInsertId int64  `json:"lastInsertId"`
	Error        string `json:"error"`
}
