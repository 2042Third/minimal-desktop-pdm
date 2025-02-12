package models

type Config struct {
	logConfig LogConfig
}

type LogLevel int

const (
	Debug LogLevel = 1
	Info  LogLevel = 2
	Warn  LogLevel = 3
	Error LogLevel = 4
)

type LogConfig struct {
	Level LogLevel
	File  string
	JSON  bool
}
