import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite';

let db: Database;

/**
 * Configures and returns a singleton sqlite database. Use this API to obtain
 * a reference to the database.
 */
export async function getDatabase(): Promise<Database> {
    if (!db) {
        db = await open({
            filename: '/tmp/transactions.db',
            driver: sqlite3.Database
        });
    }
    return db;
}
