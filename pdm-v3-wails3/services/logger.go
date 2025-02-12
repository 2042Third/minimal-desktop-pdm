package services

//
//import (
//	"pdm/config"
//)
//
//type Logger struct {
//	logLevel config.LogLevel
//}
//
//func NewLogger(logConfig config.LogConfig) *Logger {
//	return &Logger{logLevel: logConfig.Level}
//}
//
//func (l *Logger) SetConfig(logConfig config.LogConfig) {
//	l.logLevel = logConfig.Level
//}
//
//func (l *Logger) Debug(msg string) {
//	if l.logLevel <= config.Debug {
//		println("DEBUG: " + msg)
//	}
//}
//
//func (l *Logger) Info(msg string) {
//	if l.logLevel <= config.Info {
//		println("INFO: " + msg)
//	}
//}
//
//func (l *Logger) Warn(msg string) {
//	if l.logLevel <= config.Warn {
//		println("WARN: " + msg)
//	}
//}
//
//func (l *Logger) Error(msg string) {
//	if l.logLevel <= config.Error {
//		println("ERROR: " + msg)
//	}
//}
