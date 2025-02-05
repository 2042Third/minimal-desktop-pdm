package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name  string
	Email string
}

type Post struct {
	gorm.Model
	Title   string
	Content string
	UserID  uint
	User    User
}
