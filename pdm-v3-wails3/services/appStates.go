package services

import (
	"github.com/wailsapp/wails/v3/pkg/application"
	"pdm/models"
	"time"
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

	err := db.AutoMigrate(models.AppStatus{})
	if err != nil {
		return err
	}

	a.app.Logger.Info(Key(Runtime, "a"))

	// See the last time the app was opened

	// First, get the []byte from the last time the app was opened
	var lastTimeOpenKV models.AppStatus
	db.First(&lastTimeOpenKV, "key = ?", Key(MainWindow, LastTimeOpen))
	if db.Error != nil {
		a.app.Logger.Error("Failed to get last time open", "error", db.Error)
	}
	a.app.Logger.Info("Last time open bytes", "bytes", lastTimeOpenKV.Value)
	var lastTimeOpen time.Time
	err = ToTime(lastTimeOpenKV.Value, &lastTimeOpen)
	if err != nil {
		a.app.Logger.Error("Failed to convert last time open to time", "error", err)
	}
	a.app.Logger.Info("Last time open", "time", lastTimeOpen)

	// Save the current time as the last time the app was opened
	timeBytes, err := ValTime(time.Now())
	if err != nil {
		a.app.Logger.Error("Failed to convert time to bytes", "error", err)
	}
	a.app.Logger.Info("Current time", "time", time.Now())
	tx := db.Save(&models.AppStatus{Key: Key(MainWindow, LastTimeOpen), Value: timeBytes})
	if tx.Error != nil {
		a.app.Logger.Error("Failed to save last time open", "error", tx.Error)
	}

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
	//a.mainWindow.RegisterContextMenu("test", contextMenu)

	// Registering the menu with the app will make it available to all windows
	app.RegisterContextMenu("test1", globalContextMenu)

	// Make database table context menu
	dbTableContextMenu := app.NewMenu()
	dbTableContextMenu.Add("Edit Cell").OnClick(CellClicked)
	a.mainWindow.RegisterContextMenu("dbTableMenu", dbTableContextMenu)

}

func (a *AppState) LoadEnv(envContent string) {

}
