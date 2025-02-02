//go:build !production

package main

import "embed"

//go:embed all:frontend/.nuxt
var assets embed.FS

var RUNNING_URL = "http://localhost:3000/"
