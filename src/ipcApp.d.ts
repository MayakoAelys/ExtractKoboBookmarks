export interface IElectronAPI {
    selectKoboReaderFileAsync: () => Promise<string | undefined>,
  }
  
  declare global {
    interface Window {
      ipcApp: IElectronAPI
    }
  }