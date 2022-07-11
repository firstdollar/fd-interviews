import { Database } from 'better-sqlite3';
import { Transaction, TransactionsService } from './types';

export class DbTransactionsService implements TransactionsService {
    constructor(private database: Database) {}

    async saveTransactions(transactions: Transaction[]): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async listTransactions(): Promise<Transaction[]> {
        return this.database
            .prepare(
                `
                SELECT
                    id AS "transactionId",
                    date
                FROM transactions
                ORDER BY date DESC
                `,
            )
            .all();
    }
}
