import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, ipcMain } from 'electron';

const isDev = process.env.NODE_ENV === 'development'

function createWindow () {
  const rendererLocation = isDev
    ? path.join(app.getAppPath(), '..', 'renderer')
    : path.join(app.getAppPath(), 'dist', 'renderer')
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: path.join(rendererLocation, 'preload.js'),
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(rendererLocation, 'index.html'),
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
