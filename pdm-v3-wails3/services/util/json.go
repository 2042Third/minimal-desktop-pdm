package util

import (
	"encoding/json"
	"fmt"
)

func ToJsonString(v interface{}) string {
	// Marshal the struct to JSON
	jsonBytes, err := json.Marshal(v)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return ""
	}
	return string(jsonBytes)
}
