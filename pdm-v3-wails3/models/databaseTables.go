package models

import "gorm.io/gorm"

type AppStatus struct {
	gorm.Model
	Key   string `gorm:"column:key;type:text;index" json:"key"`
	Value []byte `gorm:"column:value;type:blob" json:"value"`
}

func (AppStatus) TableName() string {
	return "appstatus"
}
