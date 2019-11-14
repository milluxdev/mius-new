'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray
} from 'electron'
import path from 'path'
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

let appTray;

function winShow() {
  if (!win.isVisible()) {
    win.show();
  } else {
    win.focus();
  }
}

function winShowOrMinimize() {
  if (win.isVisible()) {
    win.hide();
  } else {
    win.show();
  }
}

const chineseMenu = Menu.buildFromTemplate([{
  label: '显示/最小化窗口',
  type: 'normal',
  click: winShowOrMinimize
}, {
  label: '设置',
  type: 'normal',
  click: settingClick
}, {
  type: 'separator',
}, {
  label: '退出',
  click: app.quit
}]);
const englishMenu = Menu.buildFromTemplate([{
  label: 'Show or Minimize',
  type: 'normal',
  click: winShowOrMinimize
}, {
  label: 'Setting',
  type: 'normal',
  click: settingClick
}, {
  type: 'separator',
}, {
  label: 'Quit',
  click: app.quit
}]);

function createTray() {
  appTray = new Tray(path.join(__static, 'icon.ico'));
  appTray.on('click', (event) => {
    winShow()
  });
  appTray.setToolTip('Mius');
  appTray.setContextMenu(chineseMenu);
}

function settingClick() {
  win.webContents.send('setting', 'setting')
  winShow()
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
    console.log("Development")
    console.log(__static)
  }
  createWindow()
  createTray()
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
ipcMain.on('min', () => win.hide());
ipcMain.on('changeLanguages', (event, message) => {
  if ('zh-hans' == message) {
    appTray.setContextMenu(chineseMenu);
  } else {
    appTray.setContextMenu(englishMenu);
  }
})