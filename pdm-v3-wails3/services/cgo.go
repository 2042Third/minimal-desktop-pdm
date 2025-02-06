package services

/*
#include <stdio.h>
#include <stdlib.h>
void hello() {
   printf("Hello from C");
}
void getHelloString(const char* a, int a_size,  char* b) {
	for (int i=0;i < a_size;i++) {
		b[i] = a[0];
	}
}
*/
import "C"
import (
	"github.com/wailsapp/wails/v3/pkg/application"
	"log"
	"unsafe"
)

type NativeModules struct {
	CellClicked func(data *application.Context)
}

func (m *NativeModules) Hello() {
	C.hello()
}

func (m *NativeModules) GetHelloString(a string) string {
	if len(a) > 99 {
		log.Printf("String too long: %s", a)
		return ""
	}
	cStr := C.CString(a)
	defer C.free(unsafe.Pointer(cStr))
	cStrOut := (*C.char)(C.malloc(C.size_t(100)))
	defer C.free(unsafe.Pointer(cStrOut))
	C.getHelloString(cStr, C.int(len(a)), cStrOut)
	return C.GoString(cStrOut)
}
