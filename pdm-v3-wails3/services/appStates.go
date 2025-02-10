package services

import (
	"fmt"
	"github.com/wailsapp/wails/v3/pkg/application"
)

type AppState struct {
	app        *application.App
	mainWindow *application.WebviewWindow
	configDB   *Database
}

func NewAppState(app *application.App, mainWindow *application.WebviewWindow) *AppState {
	return &AppState{
		app:        app,
		mainWindow: mainWindow,
	}
}

func (a *AppState) Attach(app *application.App, mainWindow *application.WebviewWindow) {
	a.app = app
	a.mainWindow = mainWindow
}

func (a *AppState) Init(CellClicked func(data *application.Context)) error {
	a.initMenus(CellClicked)

	a.configDB = NewDatabase()
	a.configDB.Open("./runtime/rt.db", "secret")

	db := a.configDB.GetGorm()

	// Query to get all table names
	var tables []string
	result := db.Raw("SELECT count(*) FROM sqlite_master WHERE type='table' AND name=\"users\"").Scan(&tables)
	if result.Error != nil {
		a.app.Logger.Error("failed to list tables: %v", result.Error)
	}

	// Print all table names
	fmt.Println("Tables in the database:")
	for _, table := range tables {
		fmt.Println(table)
	}

	//a.configDB.db.AutoMigrate(&models.Config{})
	a.configDB.RunSmallTest()
	a.configDB.RunQueryTest()
	return nil
}

func (a *AppState) initMenus(CellClicked func(data *application.Context)) {
	app := a.app

	contextMenu := app.NewMenu()
	contextMenu.Add("Click Me").OnClick(func(data *application.Context) {
		app.Logger.Info("Context menu", "context data", data.ContextMenuData())
	})

	globalContextMenu := app.NewMenu()
	globalContextMenu.Add("Default context menu item").OnClick(func(data *application.Context) {
		app.Logger.Info("Global context menu", "context data", data.ContextMenuData())
	})

	// Registering the menu with a window will make it available to that window only
	a.mainWindow.RegisterContextMenu("test", contextMenu)

	// Registering the menu with the app will make it available to all windows
	app.RegisterContextMenu("test1", globalContextMenu)

	// Make database table context menu
	dbTableContextMenu := app.NewMenu()
	dbTableContextMenu.Add("Edit Cell").OnClick(CellClicked)
	a.mainWindow.RegisterContextMenu("dbTableMenu", dbTableContextMenu)

}
