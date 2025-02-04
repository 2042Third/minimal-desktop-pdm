package services

import (
	"github.com/wailsapp/wails/v3/pkg/application"
	"log"
	"runtime"
)

type AppState struct {
	app *application.App
}

func NewAppState(app *application.App) *AppState {
	return &AppState{
		app: app,
	}
}

func (a *AppState) Init() error {
	app := a.app
	//contextMenu := application.Contex NewContextMenu("menu-id")
	menu := app.NewMenu()

	// Add platform-specific application menu
	if runtime.GOOS == "darwin" {
		menu.AddRole(application.AppMenu)
	}

	// Add standard menus
	menu.AddRole(application.EditMenu)
	menu.AddRole(application.ViewMenu)
	menu.AddRole(application.WindowMenu)
	menu.AddRole(application.HelpMenu)

	// Add custom menu
	toolsMenu := menu.AddSubmenu("Tools")

	// Add checkbox item
	toolsMenu.AddCheckbox("Dark Mode", false).OnClick(func(ctx *application.Context) {
		isDark := ctx.ClickedMenuItem().Checked()
		log.Printf("Dark Mode: %v", isDark)
	})

	// Add submenu
	advancedMenu := toolsMenu.AddSubmenu("Advanced")
	advancedMenu.Add("Configure...").OnClick(func(ctx *application.Context) {
		log.Printf("Configuration Called from Menu")
		// Show configuration
	})

	// Set the menu
	app.SetMenu(menu)
	log.Printf("Menu Init Complete")
	return nil
}
