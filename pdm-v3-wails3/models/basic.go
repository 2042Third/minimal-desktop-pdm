package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name  string `gorm:"column:name" json:"name"`
	Email string `gorm:"column:email" json:"email"`
}

type Post struct {
	gorm.Model
	Title   string `gorm:"column:title" json:"title"`
	Content string `gorm:"column:content" json:"content"`
	UserID  uint   `gorm:"column:userid" json:"userid"`
	User    User   `gorm:"foreignKey:UserID" json:"user"`
}
