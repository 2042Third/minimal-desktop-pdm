package models

type FileTreeMap struct {
	Root *FileNode `json:"root"`
}

type FileNode struct {
	Name     string      `json:"name"`
	IsDir    bool        `json:"isDir"`
	Size     int64       `json:"size"`
	Children []*FileNode `json:"children"`
}
