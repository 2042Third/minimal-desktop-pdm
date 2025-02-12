package services

import (
	"math"
	"testing"
	"time"
)

func TestKey(t *testing.T) {
	tests := []struct {
		name     string
		args     []State
		expected string
	}{
		{
			name:     "single state",
			args:     []State{Runtime},
			expected: "/runtime",
		},
		{
			name:     "multiple states",
			args:     []State{Runtime, IsOpen},
			expected: "/runtime/isopen",
		},
		{
			name:     "no states",
			args:     []State{},
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Key(tt.args...); got != tt.expected {
				t.Errorf("Key() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestValInt(t *testing.T) {
	tests := []struct {
		name     string
		input    int64
		expected int64
	}{
		{"positive number", 42, 42},
		{"negative number", -42, -42},
		{"zero", 0, 0},
		{"max int64", math.MaxInt64, math.MaxInt64},
		{"min int64", math.MinInt64, math.MinInt64},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			bytes := ValInt(tt.input)
			got := ToInt(bytes)
			if got != tt.expected {
				t.Errorf("ValInt() -> ToInt() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestValFloat(t *testing.T) {
	tests := []struct {
		name     string
		input    float64
		expected float64
	}{
		{"positive number", 3.14, 3.14},
		{"negative number", -3.14, -3.14},
		{"zero", 0.0, 0.0},
		{"max float64", math.MaxFloat64, math.MaxFloat64},
		{"smallest positive", math.SmallestNonzeroFloat64, math.SmallestNonzeroFloat64},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			bytes := ValFloat(tt.input)
			got := ToFloat(bytes)
			if got != tt.expected {
				t.Errorf("ValFloat() -> ToFloat() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestValBool(t *testing.T) {
	tests := []struct {
		name     string
		input    bool
		expected bool
	}{
		{"true value", true, true},
		{"false value", false, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			bytes := ValBool(tt.input)
			got := ToBool(bytes)
			if got != tt.expected {
				t.Errorf("ValBool() -> ToBool() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestValString(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{"empty string", "", ""},
		{"hello world", "hello world", "hello world"},
		{"special chars", "!@#$%^&*()", "!@#$%^&*()"},
		{"unicode", "Hello, 世界", "Hello, 世界"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			bytes := ValString(tt.input)
			got := ToString(bytes)
			if got != tt.expected {
				t.Errorf("ValString() -> ToString() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestValTime(t *testing.T) {
	tests := []struct {
		name        string
		input       time.Time
		expectError bool
	}{
		{
			name:        "valid time",
			input:       time.Date(2023, 1, 1, 12, 0, 0, 0, time.UTC),
			expectError: false,
		},
		{
			name:        "zero time",
			input:       time.Time{},
			expectError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			bytes, err := ValTime(tt.input)
			if (err != nil) != tt.expectError {
				t.Errorf("ValTime() error = %v, expectError %v", err, tt.expectError)
				return
			}

			if !tt.expectError {
				var got time.Time
				err = ToTime(bytes, &got)
				if err != nil {
					t.Errorf("ToTime() unexpected error: %v", err)
					return
				}
				if !got.Equal(tt.input) {
					t.Errorf("ValTime() -> ToTime() = %v, want %v", got, tt.input)
				}
			}
		})
	}
}

// TestToTime_InvalidInput tests the error handling of ToTime
func TestToTime_InvalidInput(t *testing.T) {
	var result time.Time
	err := ToTime([]byte("invalid time format"), &result)
	if err == nil {
		t.Error("ToTime() expected error for invalid input, got nil")
	}
}
