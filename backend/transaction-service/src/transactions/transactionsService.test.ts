import { Database } from 'better-sqlite3';
import {
	DbTransactionsService,
	TransactionsService,
	up as createTransactionsTable,
	down as dropTransactionsTable,
} from '.';
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

	test('transactions are initially empty', async () => {
		const transactions = await transactionsService.listTransactions();
		expect(transactions).toEqual([]);
	});

	test.todo('saves transactions to the database');
	test.todo('handles updates to existing transactions');
});
