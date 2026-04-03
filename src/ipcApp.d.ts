export interface IElectronAPI {
    selectKoboReaderFile: () => Promise<void>,
  }
  
  declare global {
    interface Window {
      ipcApp: IElectronAPI
    }
  }