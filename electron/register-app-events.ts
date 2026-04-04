import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { update } from './update'
import { ipcApp } from './ipcApp'

let win: BrowserWindow | null

export function createWindow(baseDir: string, viteDevServerUrl: string, rendererDist: string) {
    win = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
      webPreferences: {
        preload: path.join(baseDir, 'preload.mjs'),
      },
      width: 1500,
      height: 900
    })

    win.webContents.openDevTools();

    // Enable auto-update logic
    update(win)
  
    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
      win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })
  
    if (viteDevServerUrl) {
      win.loadURL(viteDevServerUrl)
    } else {
      // win.loadFile('dist/index.html')
      win.loadFile(path.join(rendererDist!, 'index.html'))
    }
  }

export function registerAppEvents(baseDir: string, viteDevServerUrl: string, rendererDist: string) {
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
        app.quit()
        win = null
        }
    });
    
    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(baseDir, viteDevServerUrl, rendererDist)
        }
    });

    ipcMain.handle('ipcApp:selectKoboReaderFile', () => {
        return ipcApp.selectKoboReaderFile();
      });      
}