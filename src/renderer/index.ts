// import { ipcRenderer } from 'electron';
import './main.scss';
import type { PreloadExported } from './preload'

declare global {
  interface Window extends PreloadExported {
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const element = document.getElementById("root");
  if (element === null) {
    throw Error("#root is missing");
  }
  element.innerHTML = 'Hello World;'
  const msg = await window.electron.ipcRenderer.invoke('my-invokable-ipc', 'send from renderer')
  element.innerHTML += msg
})
