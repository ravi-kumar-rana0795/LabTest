const { app, BrowserWindow } = require("electron")

let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true
    }
  })

  mainWindow.loadURL("https://lab-test-six.vercel.app/")
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})