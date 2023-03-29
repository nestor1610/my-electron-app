const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')

const createWindow = () => {
  // Atributos de la ventana a crear
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // Configuraciones - Comunicacion de electron con el renderer
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  ipcMain.handle('ping', () => 'pong')

  ipcMain.on('set-title', handleSetTitle)

  ipcMain.handle('dialog:openFile', handleFileOpen)

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => win.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => win.webContents.send('update-counter', -1),
          label: 'Decrement',
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu)

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })

  win.loadFile('index.html')
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

const handleSetTitle = (event, title) => {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})