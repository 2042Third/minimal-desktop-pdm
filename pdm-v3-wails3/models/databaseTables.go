package models

import "gorm.io/gorm"

// KeyVal interface defines the common behavior
type KeyVal interface {
	TableName() string
	GetKey() string
	GetValue() []byte
	SetKey(string)
	SetValue([]byte)
}

// BaseKeyVal contains the common fields
type BaseKeyVal struct {
	gorm.Model
	Key   string `gorm:"column:key;type:text;index" json:"key"`
	Value []byte `gorm:"column:value;type:blob" json:"value"`
}

// Implement the interface methods for BaseKeyVal
func (b *BaseKeyVal) GetKey() string {
	return b.Key
}

func (b *BaseKeyVal) GetValue() []byte {
	return b.Value
}

func (b *BaseKeyVal) SetKey(key string) {
	b.Key = key
}

func (b *BaseKeyVal) SetValue(value []byte) {
	b.Value = value
}

// KeyValueType for general config
type KeyValueType struct {
	BaseKeyVal
}

func (*KeyValueType) TableName() string {
	return "keyvaluetype"
}

// ConfigStore handles the database operations
type ConfigStore struct {
	db *gorm.DB
}

// NewConfigStore creates a new config store
func NewConfigStore(db *gorm.DB) *ConfigStore {
	return &ConfigStore{db: db}
}

// Save saves any KeyVal implementation
func (cs *ConfigStore) Save(kv KeyVal) error {
	return cs.db.Table(kv.TableName()).Save(kv).Error
}

// Get retrieves a value by key for any KeyVal implementation
func (cs *ConfigStore) Get(key string, result KeyVal) error {
	return cs.db.Table(result.TableName()).Where("key = ?", key).First(result).Error
}

// Delete removes a key-value pair
func (cs *ConfigStore) Delete(kv KeyVal) error {
	return cs.db.Table(kv.TableName()).Where("key = ?", kv.GetKey()).Delete(kv).Error
}
