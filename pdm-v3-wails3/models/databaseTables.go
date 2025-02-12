package models

import "gorm.io/gorm"

type KeyVal interface {
	GetKey() string
	GetValue() []byte
}

type AppStatus struct {
	gorm.Model
	Key   string `gorm:"column:key;type:text;index" json:"key"`
	Value []byte `gorm:"column:value;type:blob" json:"value"`
}

func (*AppStatus) TableName() string {
	return "appstatus"
}

func (a *AppStatus) GetKey() string {
	return a.Key
}

func (a *AppStatus) GetValue() []byte {
	return a.Value
}
