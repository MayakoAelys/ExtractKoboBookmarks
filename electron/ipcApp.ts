import { BrowserWindow } from 'electron';

export const ipcApp = {
    selectKoboReaderFile(event: any) {
        console.log('ipcApp:selectKoboReaderFile');
        const win = BrowserWindow.fromWebContents(event.sender);

        win?.setTitle("tedcdfg");
    }
} 