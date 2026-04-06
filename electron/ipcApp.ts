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
        const sqlBookmarks: SqlBookmark[] = sqliteUtils.GetBookmarksFromKoboReaderFile(koboReaderFilePath);
        const bookmarks: Bookmark[] = await fileUtils.GetAllBookmarksAsync(sqlBookmarks, koboRootFolderPath);
        fileUtils.extractZipFiles(bookmarks);
    }
} 