import { Database } from 'better-sqlite3';

/**
 * "up" migration for the transactions table. This API should create the table
 * with all necessary columns and settings. Note, we do not need to support versioned
 * migrations at this time.
 */
export async function up(database: Database): Promise<void> {
    database.exec(`
        CREATE TABLE IF NOT EXISTS transactions
        (
            id TEXT PRIMARY KEY NOT NULL,
            date TEXT NOT NULL
        );
    `);
}

/**
 * "down" migration for the transactions table. This API should drop the transactions
 * table.
 */
export async function down(database: Database): Promise<void> {
    database.exec(`DROP TABLE IF EXISTS transactions`);
}
