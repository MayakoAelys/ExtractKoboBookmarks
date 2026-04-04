import { dialog } from 'electron';

function openKoboReaderDbFile(): string | undefined {
    const chosenFiles: string[] | undefined = dialog.showOpenDialogSync({
        properties: ["openFile"],
        filters: [{
            name: 'SQLite',
            extensions: ["sqlite"]
        }]
    });

    if (!chosenFiles)
        return undefined;

    return chosenFiles[0];
}

export const ipcApp = {
    selectKoboReaderFile() {
        console.log('ipcApp:selectKoboReaderFile - IN');

        const chosenFile = openKoboReaderDbFile();

        console.log(`chosenFiles: ${JSON.stringify(chosenFile)}`);
        
        console.log('ipcApp:selectKoboReaderFile - OUT');

        return chosenFile;
    }
} 