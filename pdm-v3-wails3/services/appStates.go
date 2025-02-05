package services

import (
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
	app.RegisterContextMenu("test", globalContextMenu)

	return nil
}
