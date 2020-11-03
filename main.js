const { app, BrowserWindow, globalShortcut, nativeTheme} = require('electron')
const configs = require('./configs')

let win;

function createWindow () {
  const { url } = configs;

  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(url);

}

function toogleDevTools() {
  win.webContents.toggleDevTools();
}

function pushFrontWindow() {
  if (win.isFocused()) {
    win.minimize()
  } else {
    win.show();
  }
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+j', toogleDevTools);
  globalShortcut.register('CmdOrCtrl+Shift+Space', pushFrontWindow);
}

app.whenReady()
.then(createWindow)
.then(createShortcuts)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
