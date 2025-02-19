package services

import (
	"fmt"
	"os"
	"pdm/models"
)

func GetFileTreemap(tm *models.FileTreeMap) {
	err := addFilesFrom(tm.Root)
	if err != nil {
		fmt.Println(err)
	}
}

// listFiles recursively add all files into the file tree map
func addFilesFrom(path *models.FileNode) error {
	if !path.IsDir {
		return fmt.Errorf("\"%v\" is not a directory", path.Name)
	}

	// Add files from path
	files, err := os.ReadDir(path.Name)
	if err != nil {
		return err
	}

	for _, file := range files {
		if file.IsDir() {
			// Add directory
			path.Children = append(path.Children, &models.FileNode{
				Name:  path.Name + string(os.PathSeparator) + file.Name(),
				IsDir: true,
			})
			// Recursively add files
			err := addFilesFrom(path.Children[len(path.Children)-1])
			if err != nil {
				return err
			}
		} else {
			// Add file
			fileInfo, err := file.Info()
			if err != nil {
				return err
			}
			path.Children = append(path.Children, &models.FileNode{
				Name:  file.Name(),
				IsDir: false,
				Size:  fileInfo.Size(),
			})
		}
	}
	return nil
}
