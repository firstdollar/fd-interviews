# NL-to-SQL Evals

This is a live-coding exercise for AI Platform Engineer candidates.

The candidate may use any process of their choosing: any language, any agent, any LLM -- or none at all if you prefer. TypeScript is a sensible default. Bring your own Claude / Cursor / etc., or we can provision a Gemini API key at the start of the session.

## The task

You are a Platform Engineer who accelerates other team's AI implementations. The Data Platform team wants to ship a natural-language interface over the analytics database — the user types a question, an LLM produces SQL, the SQL runs, the user sees the result. The team has a working prompt and a small labeled dataset, and they have asked you to help productionize it.

As part of the Platform standards, you identify that they need an **evaluation harness** to measure and verify the prompt implementation, and that this harness needs to run as part of the team's unit test suite in CI/CD.

**Your job is to build an evaluation harness for this prompt that the Data Platform team will run in CI/CD.**

The team's prompt lives in [`prompt.txt`](./prompt.txt). The schema lives in [`schema.sql`](./schema.sql). A pre-seeded SQLite database (`store.db`) is built automatically by `npm install`. A small set of labeled examples we believe are correct lives in [`dataset.json`](./dataset.json).

Think out loud. There is no "finished" state we are looking for — we want to see how you reason about evaluating an LLM-powered system. Treat the panel as your team; ask us anything.

## The system under test

The prompt currently deployed in production is in [`prompt.txt`](./prompt.txt). The literal strings `{schema}` and `{question}` are replaced at runtime with the schema DDL and the user's question.

## The schema and the database

[`schema.sql`](./schema.sql) defines three tables: `users`, `products`, `orders`. After `npm install`, the file [`store.db`](./store.db) (gitignored, built by the postinstall script) contains the schema plus a deterministic seed of 30 users, 15 products, and 150 orders.

You can open it with any SQLite client, e.g. `sqlite3 store.db`.

## The dataset

Ten cases live in [`dataset.json`](./dataset.json). Each case has:

- `id`: stable identifier.
- `kind`: `clean | ambiguous | adversarial | edge`.
- `input`: the natural-language question.
- `expected`: either `{ "rows": [...], "ordered": true|false }` or `null`. `null` means there is no single correct result-set — the case is ambiguous, adversarial, or otherwise not appropriate for rule-based grading. Decide how to score it.

## Guidelines

- Use any language, runtime, and LLM you are comfortable with.
- You may modify, extend, or replace the dataset.
- You may modify the prompt if you have a reason to — tell us why.
- Treat the panel as your team. Ask clarifying questions, push back, request things.

## Setup

If you brought your own tooling (Claude Code, Cursor, a local repo, etc.), use it. Otherwise tell us and we will provision an API token and a scratch environment.

A minimal TypeScript scaffold is provided in [`src/index.ts`](./src/index.ts) — `getClient`, `callModel`, `loadPrompt`, and `openDB`. It expects `GEMINI_API_KEY` in the environment and will throw if it is missing. Use it, ignore it, rewrite it, or work in another language entirely.

```
npm install
export GEMINI_API_KEY=...
```

`npm install` builds `store.db` automatically. To rebuild it: `npm run db:setup`.

### Possible run commands

Using `tsx`:

```
GEMINI_API_KEY=... npx tsx src/index.ts
```

Using `tsc`:

```
npx tsc && GEMINI_API_KEY=... node dist/index.js
```
