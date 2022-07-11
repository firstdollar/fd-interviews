import { Database } from 'sqlite';
import { Transaction, TransactionsService } from './types';

export class DbTransactionsService implements TransactionsService {

    constructor(private database: Database) {}

    async saveTransactions(transactions: Transaction[]): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async listTransactions(): Promise<Transaction[]> {
        return this.database.all(
            'SELECT id AS "transactionId", date FROM transactions ORDER BY date DESC'
        );
    }
}
