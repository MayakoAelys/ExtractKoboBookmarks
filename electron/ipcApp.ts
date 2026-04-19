import { createRequire } from 'node:module';
import { dialog, shell } from 'electron';
import { sqliteUtils } from './utils/sqliteUtils';
import { SqlBookmark } from './models/SqlBookmark';
import { Bookmark } from './models/Bookmark';
import { fileUtils } from './utils/fileUtils';
import { Drive } from 'drivelist';

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

    async startExtractionAsync(koboDrivePath: string): Promise<string> {
        const sqlBookmarks: SqlBookmark[] = sqliteUtils.GetBookmarksFromKoboReaderFile(koboDrivePath);
        const bookmarks: Bookmark[] = await fileUtils.GetAllBookmarksAsync(sqlBookmarks, koboDrivePath);
        
        const extractedFilesFolder = fileUtils.extractZipFiles(bookmarks);

        shell.openPath(extractedFilesFolder);

        return extractedFilesFolder;
    },

    async getDrivesAsync(busType?: string): Promise<Drive[]> {
        const drivelist = createRequire(import.meta.url)('drivelist');
        const drives: Drive[] = await drivelist.list();
        const filteredDrives: Drive[] = [];

        for (const drive of drives) {
            if (!busType || busType === drive.busType)  {
                filteredDrives.push(drive);
            }
        }

        return filteredDrives;
    },

    async tryFindKoboReaderDriveAsync(): Promise<string | undefined> {
        const usbDrives = await this.getDrivesAsync('USB');

        for (const usbDrive of usbDrives) {
            for (const mountPoint of usbDrive.mountpoints) {
                console.log('tryFindKoboReaderDriveAsync - mountPoint:', mountPoint.path);

                if (fileUtils.tryDriveIsAKoboReader(mountPoint.path))
                    return mountPoint.path;
            }
        }

        return undefined;
    },

    async tryDriveIsAKoboReader(path: string): Promise<boolean> {
        return fileUtils.tryDriveIsAKoboReader(path);
    },

    async openFolder(path: string): Promise<void> {
        shell.openPath(path);
    }
} 