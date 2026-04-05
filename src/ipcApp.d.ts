export interface IElectronAPI {
    selectKoboReaderFileAsync: () => Promise<string | undefined>,
    selectFolderAsync: () => Promise<string | undefined>,
    startExtractionAsync: (koboReaderFilePath: string, koboRootFolderPath: string) => Promise<void>,
  }
  
  declare global {
    interface Window {
      ipcApp: IElectronAPI
    }
  }