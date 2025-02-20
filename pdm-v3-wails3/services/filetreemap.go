package services

import (
	"fmt"
	"os"
	"pdm/models"
)

type FileTreeMapService struct {
	Name string `json:"name"`
}

func NewFileTreeMapService() *FileTreeMapService {
	return &FileTreeMapService{
		Name: "FileTreeMapService",
	}
}

// FileTreemapBindingGen generates the binding for the file tree map
func (f *FileTreeMapService) FileTreemapBindingGen(tm *models.FileTreeMap) {}

// FileNodeBindingGen generates the binding for the file node
func (f *FileTreeMapService) FileNodeBindingGen(tm *models.FileNode) {}

func GetFileTreemap(tm *models.FileTreeMap) {
	_, err := addFilesFrom(tm.Root)
	if err != nil {
		fmt.Println(err)
	}
}

// listFiles recursively add all files into the file tree map
func addFilesFrom(path *models.FileNode) (int64, error) {
	if !path.IsDir {
		return 0, fmt.Errorf("\"%v\" is not a directory", path.Name)
	}

	// Add files from path
	files, err := os.ReadDir(path.Name)
	if err != nil {
		return 0, err
	}

	for _, file := range files {
		if file.IsDir() {
			// Add directory
			path.Children = append(path.Children, &models.FileNode{
				Name:  path.Name + string(os.PathSeparator) + file.Name(),
				IsDir: true,
			})

			childRef := path.Children[len(path.Children)-1]

			// Recursively add files
			size, err := addFilesFrom(childRef)
			if err != nil {
				return 0, err
			}

			path.Size += size
		} else {
			// Add file
			fileInfo, err := file.Info()
			if err != nil {
				return 0, err
			}

			path.Size += fileInfo.Size()

			path.Children = append(path.Children, &models.FileNode{
				Name:  file.Name(),
				IsDir: false,
				Size:  fileInfo.Size(),
			})
		}
	}

	return path.Size, nil
}
