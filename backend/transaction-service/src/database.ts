import SQLiteDatabase, { Database } from 'better-sqlite3';

let db: Database;

/**
 * Configures and returns a singleton SQLite database. Use this API to obtain
 * a reference to the database.
 */
export async function getDatabase(): Promise<Database> {
    if (!db) {
        db = new SQLiteDatabase(':memory:');
    }
    return db;
}
