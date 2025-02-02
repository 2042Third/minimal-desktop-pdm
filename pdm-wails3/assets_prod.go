//go:build production

package main

//go:embed all:frontend/.output/public
var assets embed.FS

var RUNNING_URL = "/"
