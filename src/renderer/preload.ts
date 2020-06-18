import * as electron from 'electron'

export interface PreloadExported {
  electron: typeof electron
}

declare global {
  namespace NodeJS {
    interface Global extends PreloadExported {
    }
  }
}

process.once('loaded', () => {
  global.electron = electron;
})
