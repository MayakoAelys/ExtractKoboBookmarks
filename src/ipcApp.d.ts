export interface IElectronAPI {
    selectKoboReaderFileAsync: () => Promise<string | undefined>,
    selectFolderAsync: () => Promise<string | undefined>,
    startExtractionAsync: (koboRootFolderPath: string) => Promise<string>,
    getUsbDrivesAsync: () => Promise<Drive[]>,
    tryFindKoboReaderDriveAsync(): Promise<string | undefined>
  }
  
  declare global {
    interface Window {
      ipcApp: IElectronAPI
    }
  }