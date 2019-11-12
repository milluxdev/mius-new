'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Menu
} from 'electron'
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

let win

protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow() {

  Menu.setApplicationMenu(null)
  win = new BrowserWindow({
    minHeight: 750,
    height: 750, //窗口高度
    minWidth: 950,
    width: 950, //窗口宽度
    center: true, //是否居中
    resizable: true, //窗口是否可以改变尺寸
    show: false, //窗口创建的时候是否显示
    frame: false,
    useContentSize: true,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    console.log(process.env.WEBPACK_DEV_SERVER_URL)
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
ipcMain.on('close', () => win.close());
ipcMain.on('min', () => win.minimize());