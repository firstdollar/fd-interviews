# Transactions Service

This project is designed to be a collaborative coding exercise for interviews.

The goal of this project is as follows:

1. Define the database schema for the [Transaction](./src/types.ts#L24) type defined in this project. This will require updating the `up` migration in [`src/migrations.ts`](./src/migrations.ts#L8). A stub is provided initially.
2. Implement the `saveTransactions` API, a bulk upsert API on the table created in Step 1. This will require implementing the `TransactionsService` at [`src/transactionsService.ts`](./src/transactionsService.ts#L4)
3. Implement the `todo` tests for the `TransactionsService` at [`src/transactionsService.test.ts`](./src/transactionsService.test.ts#L32)

## Getting Started

This project depends on `npm` and the node ecosystem. If you don't have `npm` installed, install it via `nvm`: <https://github.com/nvm-sh/nvm#installing-and-updating>

1. Clone this project.
2. `npm install`

## Testing your Changes

To run the tests (which should exercise your changes)...

1. `npm test`

## Guidelines

The goal of this project is not to assess familiarity with Typescript/javascript, but rather to assess familiarity with basic problems that will be solved in our backend system.

It is acceptable to use google and other tools to inform implementation. There is obviously a balance -- copy/pasting an answer out of StackOverflow is likely to be frowned upon, but using the internet to research the API's used in this project, typescript syntax, etc is a-ok.

## Documentation Links

-   `SQLite` syntax: <https://www.sqlite.org/lang.html>
-   `better-sqlite3` API: <https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md>
-   `jest` docs: <https://jestjs.io/docs/api>
