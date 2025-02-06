package services

import (
	"encoding/json"
	"fmt"
	"github.com/wailsapp/wails/v3/pkg/application"
)

type AppState struct {
	app        *application.App
	mainWindow *application.WebviewWindow
}

func NewAppState(app *application.App, mainWindow *application.WebviewWindow) *AppState {
	return &AppState{
		app:        app,
		mainWindow: mainWindow,
	}
}

func (a *AppState) Init() error {
	app := a.app

	contextMenu := app.NewMenu()
	contextMenu.Add("Click Me").OnClick(func(data *application.Context) {
		app.Logger.Info("Context menu", "context data", data.ContextMenuData())
	})

	globalContextMenu := app.NewMenu()
	globalContextMenu.Add("Default context menu item").OnClick(func(data *application.Context) {
		app.Logger.Info("Context menu", "context data", data.ContextMenuData())
	})

	// Registering the menu with a window will make it available to that window only
	a.mainWindow.RegisterContextMenu("test", contextMenu)

	// Registering the menu with the app will make it available to all windows
	app.RegisterContextMenu("test1", globalContextMenu)

	// Make database table context menu
	dbTableContextMenu := app.NewMenu()
	dbTableContextMenu.Add("Edit Cell").OnClick(func(data *application.Context) {
		app.Logger.Info("Edit Cell Context menu raw", "data ", data.ContextMenuData())
		cellInfoJSONString, err := convertToString(data.ContextMenuData())
		if err != nil {
			app.Logger.Error("Failed to convert context menu data to string", "error", err)
			return
		}
		parsed, err := parseCellInfo(cellInfoJSONString)
		if err != nil {
			app.Logger.Error("Failed to parse cell info", "error", err)
			return
		}
		app.Logger.Info("Edit Cell Context menu", "rowid", parsed.RowID, "column", parsed.ColumnName)
	})
	a.mainWindow.RegisterContextMenu("dbTableMenu", dbTableContextMenu)

	return nil
}

type CellInfo struct {
	RowID      int    `json:"rowid"`
	ColumnName string `json:"column"`
}

func convertToString(value interface{}) (string, error) {
	str, ok := value.(string)
	if !ok {
		return "", fmt.Errorf("value is not a string")
	}
	return str, nil
}

func parseCellInfo(cellInfoJSON string) (*CellInfo, error) {
	var cellInfo CellInfo
	err := json.Unmarshal([]byte(cellInfoJSON), &cellInfo)
	if err != nil {
		return nil, err
	}
	return &cellInfo, nil
}
