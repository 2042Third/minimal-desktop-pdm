package models

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
