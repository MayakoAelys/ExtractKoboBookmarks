import { dialog } from 'electron';
import { sqliteUtils } from './utils/sqliteUtils';
import { SqlBookmark } from './models/SqlBookmark';
import { Bookmark } from './models/Bookmark';
import { fileUtils } from './utils/fileUtils';

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

    async startExtraction(koboReaderFilePath: string, koboRootFolderPath: string): Promise<void> {
        // console.log('ipcApp - startExtraction - IN');
        // console.log('ipcApp - startExtraction - koboReaderFilePath', koboReaderFilePath);
        // console.log('ipcApp - startExtraction - koboRootFolderPath', koboRootFolderPath);

        // 1. Find sqlite file -> open it -> returns rows
        //    Extract bookmarks => bookmarks list object
        const sqlBookmarks: SqlBookmark[] = sqliteUtils.GetBookmarksFromKoboReaderFile(koboReaderFilePath);

        // 2. Find corresponding files
        const bookmarks: Bookmark[] = await fileUtils.GetAllBookmarksAsync(sqlBookmarks, koboRootFolderPath);
        console.log('ipcApp - startExtraction - Bookmark:', bookmarks);

        // 3. Extract ZIP files
        fileUtils.extractZipFiles(bookmarks);
        
        console.log('ipcApp - startExtraction - OUT');
    }
} 