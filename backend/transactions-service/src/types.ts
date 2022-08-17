/**
 * Mediates access to the `transactions` table, exposing an API for supported
 * database operations on these entities.
 */
export interface TransactionsService {
    /**
     * Saves a list of transactions to the database. For transactions that
     * already exist in the database, this method should update those entities
     * with the data from this request.
     *
     * @param transactions the transactions to persist
     */
    saveTransactions(transactions: Array<Transaction>): Promise<void>;

    /**
     * Lists all transactions stored in the database.
     */
    listTransactions(): Promise<Array<Transaction>>;
}

/**
 * Application type reflecting transaction data stored in the DB.
 */
export type Transaction = {
    /** the ID of the transaction */
    transactionId: string;
    /** the monetary amount of the transaction */
    amount: Money;
    /** the date the transaction was created: YYYY-MM-DD */
    date: string;
    /** description of the transaction */
    description: string;
    /** type of trx (deposit, withdrawal, etc) */
    type: TransactionType;
};

/**
 * Money: a numeric amount with a defined currency.
 */
export type Money = {
    value: number;
    currency: string;
};

/**
 * The possible set of transaction types.
 */
export enum TransactionType {
    Deposit = 'DEPOSIT',
    Withdrawal = 'WITHDRAWAL',
}
