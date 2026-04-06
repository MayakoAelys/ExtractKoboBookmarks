import { SqlBookmark } from "./SqlBookmark"

export type Bookmark = {
    sqlBookmark: SqlBookmark;
    filePath: string;
    fileName: string;
    bookmarkedPages: number[];
}