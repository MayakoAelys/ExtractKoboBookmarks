import { dialog } from 'electron';
import { sqliteUtils } from './utils/sqliteUtils';

export const ipcApp = {
    selectKoboReaderFile(): string | undefined {
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
    },

    selectFolder(): string | undefined {
        const chosenFolder: string[] | undefined = dialog.showOpenDialogSync({
            properties: ["openDirectory"]
        });

        if (!chosenFolder)
            return undefined;

        return chosenFolder[0];
    },

    startExtraction(koboReaderFilePath: string, koboRootFolderPath: string): void {
        console.log('ipcApp - startExtraction - IN');
        console.log('ipcApp - startExtraction - koboReaderFilePath', koboReaderFilePath);
        console.log('ipcApp - startExtraction - koboRootFolderPath', koboRootFolderPath);

        // 1. Find sqlite file -> open it -> returns rows
        // 2. Extract bookmarks => bookmarks list object
        const rows = sqliteUtils.GetBookmarksFromKoboReaderFile(koboReaderFilePath);
        console.log(`ipcApp - rows: ${JSON.stringify(rows)} - ${koboRootFolderPath}`);

        // 3. Find corresponding CBZ file
        // 4. Two objects: found CBZ files, errors

        console.log('ipcApp - startExtraction - IN');
    }
} 