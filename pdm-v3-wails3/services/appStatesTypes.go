package services

import (
	"bytes"
	"encoding/gob"
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

func Val(val interface{}) []byte {

	switch i := val.(type) {
	case nil:
		return nil
	case int:
		buf := new(bytes.Buffer)
		if err := gob.NewEncoder(buf).Encode(int64(i)); err != nil {
			panic(err)
			return nil
		}
		return buf.Bytes()
	case float64:
		buf := new(bytes.Buffer)
		if err := gob.NewEncoder(buf).Encode(i); err != nil {
			panic(err)
			return nil
		}
		return buf.Bytes()
	case bool: // booleans are c-style integers
		b := make([]byte, 1)
		if i {
			b[0] = 1
		} else {
			b[0] = 0
		}
		return b
	case string:
		return []byte(i)
	case time.Time:
		return []byte(i.Format(time.RFC3339))
	default:
		buf := new(bytes.Buffer)
		if err := gob.NewEncoder(buf).Encode(i); err != nil {
			panic(err)
			return nil
		}
		return buf.Bytes()
	}
}

func ToTime(val []byte, t *time.Time) error {
	parsed, err := time.Parse(time.RFC3339, string(val))
	if err != nil {
		return err
	}
	*t = parsed
	return nil
}
