package services

import (
	"encoding/binary"
	"errors"
	"math"
	"time"
)

type State string

const (
	Runtime        State = "runtime"
	IsOpen         State = "isopen"
	MainWindow     State = "mainwindow"
	SettingsWindow State = "settingswindow"
	LastTimeOpen   State = "lasttimeopen"
)

func Key(args ...State) string {
	var key string
	for _, arg := range args {
		key += "/" + string(arg)
	}
	return key
}

// ValInt converts an integer to bytes with error handling
func ValInt(i int64) []byte {
	b := make([]byte, 8)
	binary.LittleEndian.PutUint64(b, uint64(i))
	return b
}

// ValFloat converts a float64 to bytes with error handling
func ValFloat(f float64) []byte {
	b := make([]byte, 8)
	binary.LittleEndian.PutUint64(b, math.Float64bits(f))
	return b
}

// ValTime converts a time.Time to bytes with validation
func ValTime(t time.Time) ([]byte, error) {
	if t.IsZero() {
		return nil, errors.New("zero time value")
	}
	return []byte(t.Format(time.RFC3339)), nil
}

// ValBool converts a bool to bytes
func ValBool(b bool) []byte {
	result := make([]byte, 1)
	if b {
		result[0] = 1
	}
	return result
}

// ValString ValGob converts a gob-encodable object to bytes
func ValString(s string) []byte {
	return []byte(s)
}

// ToTime Encoding functions
func ToTime(val []byte, t *time.Time) error {
	parsed, err := time.Parse(time.RFC3339, string(val))
	if err != nil {
		return err
	}
	*t = parsed
	return nil
}

// Decoding functions

// ToInt converts bytes to an integer
func ToInt(b []byte) int64 {
	return int64(binary.LittleEndian.Uint64(b))
}

// ToFloat converts bytes to a float64
func ToFloat(b []byte) float64 {
	return math.Float64frombits(binary.LittleEndian.Uint64(b))
}

// ToBool converts bytes to a bool
func ToBool(b []byte) bool {
	return b[0] == 1
}

// ToString converts bytes to a string
func ToString(b []byte) string {
	return string(b)
}
