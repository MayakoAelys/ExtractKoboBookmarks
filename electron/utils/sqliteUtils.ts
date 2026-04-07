import { createRequire } from 'node:module'
import { SqlBookmark } from '../models/SqlBookmark';
import { fileUtils } from './fileUtils';
import { error } from 'node:console';

export const sqliteUtils = {
    GetBookmarksFromKoboReaderFile(koboDrivePath: string): SqlBookmark[] {
        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - IN');
        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - koboDrivePath:', koboDrivePath);

        if (!fileUtils.tryDriveIsAKoboReader(koboDrivePath)) {
            throw error('Selected drive is not a Kobo Reader device or is corrupted');
        }

        const koboReaderSqlitePath = fileUtils.getKoboReaderFilePath(koboDrivePath);

        const database = 
            createRequire(import.meta.url)('better-sqlite3')(koboReaderSqlitePath, {
                fileMustExist: true
            });

        const rows = 
            database.prepare('SELECT BookmarkID, VolumeID, ContentID, ExtraAnnotationData FROM Bookmark').all();

        database.close();

        const result: SqlBookmark[] = [];
        
        for (const row of rows) {
            // console.log(`Row: ${JSON.stringify(row)}`);
            // Check that ExtraAnnotationData is a number and is not empty
            const pageNumber = parseInt(row["ExtraAnnotationData"]);

            if (Number.isNaN(pageNumber)) {
                console.log('Invalid ExtraAnnotationData value:', row["ExtraAnnotationData"]);
                continue;
            }

            result.push({
                BookmarkID: row["BookmarkID"],
                VolumeID: row["VolumeID"],
                ContentID: row["ContentID"],
                ExtraAnnotationData: pageNumber
            });
        }

        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - OUT');

        return result;
    }
}