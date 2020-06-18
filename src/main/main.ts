import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain } from 'electron';

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(app.getAppPath(), '..', 'renderer', 'preload.js'),
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(app.getAppPath(), '..', 'renderer', 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit();
})

ipcMain.handle('my-invokable-ipc', (_event, msg: string) => {
  return `return main: ${msg}`
})
