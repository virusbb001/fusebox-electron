import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
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
