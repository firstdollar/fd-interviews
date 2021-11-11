import { Database } from "sqlite";
import { DbTransactionsService, TransactionsService, up as createTransactionsTable, down as dropTransactionsTable } from ".";
import { getDatabase } from "../database";

describe('TransactionsService', () => {
    let database: Database;
    let transactionService: TransactionsService;

    beforeAll(async () => {
        database = await getDatabase();
        transactionService = new DbTransactionsService(database);
    });

    beforeEach(async () => {
        await createTransactionsTable(database);
    });

    afterEach(async () => {
        await dropTransactionsTable(database);
    });

    test('Transactions are Initially Empty', async () => {
        const transactions = await transactionService.listTransactions();
        expect(transactions).toEqual([]);
    });

    test.todo('Saves Transactions to the Database');
    test.todo('Handles Updates to Existing Transactions');
});
