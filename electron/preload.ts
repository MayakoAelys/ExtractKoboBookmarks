import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },

  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },

  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },

  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  }
});

contextBridge.exposeInMainWorld('ipcApp', {
  async selectKoboReaderFileAsync() {   
    return await ipcRenderer.invoke('ipcApp:selectKoboReaderFile');
  },

  async selectFolderAsync() {
    return await ipcRenderer.invoke('ipcApp:selectFolder');
  },
  
  async startExtractionAsync(koboDrivePath: string) {
    return await ipcRenderer.invoke('ipcApp:startExtractionAsync', koboDrivePath);
  },

  async getDrivesAsync(busType?: string) {
    return await ipcRenderer.invoke('ipcApp:getDrivesAsync', busType);
  },

  async tryFindKoboReaderDriveAsync() {
    return await ipcRenderer.invoke('ipcApp:tryFindKoboReaderDriveAsync');
  },

  async tryDriveIsAKoboReaderAsync(path: string) {
    return await ipcRenderer.invoke('ipcApp:tryDriveIsAKoboReader', path);
  },

  async openFolderAsync(path: string) {
    return await ipcRenderer.invoke('ipcApp:openFolder', path);
  }
});
