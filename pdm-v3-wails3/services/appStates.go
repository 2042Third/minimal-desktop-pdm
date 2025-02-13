package services

import (
	"github.com/wailsapp/wails/v3/pkg/application"
	"pdm/models"
	"time"
)

type AppState struct {
	app         *application.App
	mainWindow  *application.WebviewWindow
	configDB    *Database
	configStore *models.ConfigStore
}

// AppStatus for application status
type AppStatus struct {
	models.BaseKeyVal
}

func (*AppStatus) TableName() string {
	return "appstatus"
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

	// Create the config store
	a.configStore = models.NewConfigStore(db)

	err := db.AutoMigrate(AppStatus{})
	if err != nil {
		return err
	}

	a.app.Logger.Info(Key(Runtime, "a"))

	// See the last time the app was opened

	// First, get the []byte from the last time the app was opened
	result := &AppStatus{}
	err = a.configStore.Get(Key(MainWindow, LastTimeOpen), result)
	if err != nil {
		a.app.Logger.Error("Failed to get last time open", "error", err)
		return err
	}
	value := GetTime(result.GetValue())
	a.app.Logger.Info("Last time open", "time", value)

	// Save the current time as the last time the app was opened
	timeBytes, err := ValTime(time.Now())
	// Save to AppStatus table
	status := &AppStatus{}
	status.SetKey(Key(MainWindow, LastTimeOpen))
	status.SetValue(timeBytes)
	err = a.configStore.Save(status)
	if err != nil {
		a.app.Logger.Error("Failed to save last time open", "error", err)
		return err
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
