import { createRequire } from 'node:module';
import { dialog } from 'electron';
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

        return extractedFilesFolder;
    },

    async getUsbDrivesAsync(busType?: string): Promise<Drive[]> {
        const drivelist = createRequire(import.meta.url)('drivelist');
        const drives: Drive[] = await drivelist.list();

        // for (const drive of drives) {
        //     console.log(`Drive - ${JSON.stringify(drive)}`);
        //     console.log(`Drive ${drive.busType} - Mount: `, JSON.stringify(drive.mountpoints));
        // }

        if (!busType) return drives;

        const filteredDrives = drives.filter((drive) => drive.busType === busType);

        return filteredDrives;
    },

    async tryFindKoboReaderDriveAsync(): Promise<string | undefined> {
        const usbDrives = await this.getUsbDrivesAsync('USB');

        for (const usbDrive of usbDrives) {
            for (const mountPoint of usbDrive.mountpoints) {
                console.log('tryFindKoboReaderDriveAsync - mountPoint:', mountPoint.path);

                if (fileUtils.tryDriveIsAKoboReader(mountPoint.path))
                    return mountPoint.path;
            }
        }

        return undefined;
    }
} 