import { createRequire } from 'node:module'
import { SqlBookmark } from '../models/SqlBookmark';

export const sqliteUtils = {
    GetBookmarksFromKoboReaderFile(koboReaderFilePath: string): SqlBookmark[] {
        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - IN');
        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - koboReaderFilePath:', koboReaderFilePath);

        const database = 
            createRequire(import.meta.url)('better-sqlite3')(koboReaderFilePath, {
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