// TODO - Code cleaning, this is messy af
import fs from 'fs'
import path from 'path';
import yauzl from 'yauzl';

import { app } from 'electron';
import { Bookmark } from './../models/Bookmark';
import { SqlBookmark } from '../models/SqlBookmark';

export const fileUtils = {
    async GetAllBookmarksAsync(sqlBookmarks: SqlBookmark[], koboRootFolderPath: string): Promise<Bookmark[]> {
        console.log('fileUtils - GetAllBookmarksPath - IN');

        const result: Bookmark[] = [];
        const allKoboFilesPath: string[] = this.recursiveCBZFileSearch(koboRootFolderPath);

        for (const sqlBookmark of sqlBookmarks)
        {
            // Search an existing file for the bookmark
            const foundPath: string | undefined = allKoboFilesPath.find((filePath) => {
                const sqlBookmarkFileName = path.basename(sqlBookmark.VolumeID);

                if (path.basename(filePath) === sqlBookmarkFileName)
                    return filePath;
            });

            // Add bookmark or page number if the bookmark already exists
            let foundResult = false;

            for (let i = 0; i < result.length; i++) {
                const resultBookmark = result[i];

                if (resultBookmark.filePath === foundPath) {
                    resultBookmark.bookmarkedPages.push(sqlBookmark.ExtraAnnotationData);
                    foundResult = true;
                    break;
                }
            }

            if (!foundResult) {
                result.push({
                    sqlBookmark: sqlBookmark,
                    filePath: foundPath ?? 'Not found',
                    fileName: foundPath ? path.basename(foundPath) : 'Not found',
                    bookmarkedPages: [sqlBookmark.ExtraAnnotationData]
                });
            }
        }        
        
        // Sort the result by filename
        result.sort((a, b) => {
            if (a.fileName < b.fileName)
                return -1;
                
            if (a.fileName > b.fileName)
                return 1;

            return 0;
        });

        // Sort bookmarked pages
        const sortedResult: Bookmark[] = [];

        for (const bookmark of result) {
            bookmark.bookmarkedPages = 
                bookmark.bookmarkedPages.sort((a, b) => a - b);

            sortedResult.push(bookmark);
        }

        return sortedResult;
    },

    recursiveCBZFileSearch(currentPath: string, filesList?: string[]): string[] {
        if (!filesList)
            filesList = [];

        try {
            const entries = fs.readdirSync(currentPath, { withFileTypes: true })
            
            for (const entry of entries) {
                const fullPath = path.join(currentPath, entry.name);

                if (entry.isDirectory()) {
                    this.recursiveCBZFileSearch(fullPath, filesList);
                }

                filesList.push(fullPath);
            }
        }
        catch (error: unknown) {
            console.error('fileUtils - traverseDirectory - error:', error);
        }

        return filesList;
    },

    extractZipFiles(bookmarks: Bookmark[]): string {
        const extractFolderPath: string = path.join(app.getPath('userData'), 'Extract');

        if (!fs.existsSync(extractFolderPath))
            fs.mkdirSync(extractFolderPath);
        
        for (const bookmark of bookmarks) {
            // Open zip file
            console.log('EXTRACTING -', bookmark.fileName, `[${JSON.stringify(bookmark.bookmarkedPages)}]`);
            
            const destinationFolder = path.join(extractFolderPath, bookmark.fileName);

            // Ensure the folder exists
            if (!fs.existsSync(destinationFolder))
                fs.mkdirSync(destinationFolder);

            yauzl.open(bookmark.filePath, { lazyEntries: true, autoClose: false }, (error, zipFile) => {
                if (error || !zipFile) throw error;

                const entries: yauzl.Entry[] = [];

                zipFile.readEntry();

                zipFile.on("entry", (entry) => {
                    entries.push(entry);
                    zipFile.readEntry();
                });

                zipFile.on("end", () => {
                    entries.sort((a, b) => a.fileName.localeCompare(b.fileName));

                    for (let i = 0; i < entries.length; i++) {
                        const entry = entries[i];

                        zipFile.openReadStream(entry, (error, readStream) => {
                            if (error) throw error;

                            const shouldExtract = bookmark.bookmarkedPages.indexOf(i) !== -1;

                            if (!shouldExtract) {
                                return;
                            }
                            
                            const outPath = path.join(destinationFolder, path.basename(entry.fileName));
                            const writeStream = fs.createWriteStream(outPath);
                            
                            readStream.pipe(writeStream);
                        });
                    }
                });
            });
        }

        return extractFolderPath;
    },

    tryDriveIsAKoboReader(drivePath: string): boolean {
        try {
            const pathToTest = this.getKoboReaderFilePath(drivePath);
            const pathExists = fs.existsSync(pathToTest);

            return pathExists;
        }
        catch (error)
        {
            console.warn('fileUtils.tryDriveIsAKoboReader - error:', error);
            return false;
        }
    },

    getKoboReaderFilePath(drivePath: string): string {
        return path.join(drivePath, '.kobo', 'KoboReader.sqlite');
    }
}