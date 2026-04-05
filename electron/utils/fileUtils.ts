import fs from 'fs'
import path from 'path';
import { Bookmark } from '../models/Bookmark';
import { SqlBookmark } from '../models/SqlBookmark';

export const fileUtils = {
    async GetAllBookmarksAsync(sqlBookmarks: SqlBookmark[], koboRootFolderPath: string): Promise<Bookmark[]> {
        console.log('fileUtils - GetAllBookmarksPath - IN');

        const result: Bookmark[] = [];
        const allKoboFilesPath: string[] = this.recursiveCBZFileSearch(koboRootFolderPath);

        for (const sqlBookmark of sqlBookmarks)
        {
            // console.log('sqlBookmark:', sqlBookmark.VolumeID);

            const foundPath: string | undefined = allKoboFilesPath.find((filePath) => {
                const sqlBookmarkFileName = path.basename(sqlBookmark.VolumeID);

                // console.log('    -> find()');
                // console.log('    -> path.basename(filePath)', path.basename(filePath));
                // console.log('    -> sqlBookmarkFileName', sqlBookmarkFileName);

                if (path.basename(filePath) === sqlBookmarkFileName)
                {
                    // console.log('    -> OK!')
                    return filePath;
                }
            });

            result.push({
                sqlBookmark: sqlBookmark,
                filePath: foundPath ?? 'Not found'
            });

            //const filePath = path.join(koboRootFolderPath, path.basename(sqlBookmark.VolumeID));

            // if (fs.existsSync(filePath)) {
            //     result.push({
            //         sqlBookmark: sqlBookmark,
            //         filePath: filePath
            //     });
            // }
            // else {
            //     console.log('GetAllBookmarks - File not found or no permission to read:', filePath);
            // }
        }

        return result;
    },

    recursiveCBZFileSearch(currentPath: string, filesList?: string[]): string[] {
        if (!filesList)
            filesList = [];

        try {
            const entries = fs.readdirSync(currentPath, { withFileTypes: true })
            
            for (const entry of entries) {
                const fullPath = path.join(currentPath, entry.name);
                // console.log('recursiveCBZFileSearch - fullPath:', fullPath);

                if (entry.isDirectory()) {
                    this.recursiveCBZFileSearch(fullPath, filesList);
                }

                // if (path.extname(entry.name).toLowerCase() !== '.cbz')
                //     continue;
                // }

                filesList.push(fullPath);
            }
        }
        catch (error: unknown) {
            console.error('fileUtils - traverseDirectory - error:', error);
        }

        return filesList;
    }
}