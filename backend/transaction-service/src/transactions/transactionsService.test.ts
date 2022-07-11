import { Database } from 'sqlite';
import { DbTransactionsService, TransactionsService, up as createTransactionsTable, down as dropTransactionsTable } from '.';
import { getDatabase } from '../database';

describe('TransactionsService', () => {
    let database: Database;
    let transactionsService: TransactionsService;

    beforeAll(async () => {
        database = await getDatabase();
        transactionsService = new DbTransactionsService(database);
    });

    beforeEach(async () => {
        await createTransactionsTable(database);
    });

    afterEach(async () => {
        await dropTransactionsTable(database);
    });

    test('Transactions are Initially Empty', async () => {
        const transactions = await transactionsService.listTransactions();
        expect(transactions).toEqual([]);
    });

    test.todo('Saves Transactions to the Database');
    test.todo('Handles Updates to Existing Transactions');
});
