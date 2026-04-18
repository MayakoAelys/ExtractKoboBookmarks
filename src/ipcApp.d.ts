export interface IElectronAPI {
    selectKoboReaderFileAsync: () => Promise<string | undefined>,
    selectFolderAsync: () => Promise<string | undefined>,
    startExtractionAsync: (koboRootFolderPath: string) => Promise<string>,
    getDrivesAsync: (busType?: string) => Promise<Drive[]>,
    tryFindKoboReaderDriveAsync(): Promise<string | undefined>
  }
  
  declare global {
    interface Window {
      ipcApp: IElectronAPI
    }
  }