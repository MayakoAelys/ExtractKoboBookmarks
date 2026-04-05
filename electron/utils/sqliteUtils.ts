// import Database from 'better-sqlite3';
import { createRequire } from 'node:module'
// const Database = createRequire(import.meta.url)('better-sqlite3');

export const sqliteUtils = {
    GetBookmarksFromKoboReaderFile(koboReaderFilePath: string): unknown[] {
        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - IN');
        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - koboReaderFilePath:', koboReaderFilePath);

        const database = 
            createRequire(import.meta.url)('better-sqlite3')(koboReaderFilePath, {
                fileMustExist: true
            });

        console.log('database');

        const rows = 
            database.prepare('SELECT BookmarkID, VolumeID, ContentID, ExtraAnnotationData FROM Bookmark').all();

        console.log('rows');

        database.close();
        
        for (const row of rows) {
            console.log(`Row: ${JSON.stringify(row)}`);
        }

        console.log('sqliteUtils - GetBookmarksFromKoboReaderFile - OUT');

        return rows;
    }
}