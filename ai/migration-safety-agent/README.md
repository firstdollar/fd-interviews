# Migration Safety Agent

This is a live-coding exercise for AI Platform Engineer candidates.

The candidate may use any process of their choosing: any language, any agent, any LLM -- or none at all if you prefer. TypeScript is a sensible default. Bring your own Claude / Cursor / etc., or we can provision a Gemini API key at the start of the session.

## The task

You are a Platform Engineer who accelerates other team's AI implementations. The DB Platform team is shipping a pre-merge check that reviews proposed SQL migrations and flags risky ones to a human before they reach the deploy queue. They have asked you to prototype the agent that does the reviewing.

**Your job is to build an agent loop that takes one proposed migration and classifies it as `safe`, `risky`, or `needs-coordination`, using the tools provided to investigate impact.**

The proposed migrations live in [`migrations.json`](./migrations.json). The current schema is in [`schema.json`](./schema.json). Downstream consumers per table are in [`consumers.json`](./consumers.json).

Think out loud. There is no "finished" state we are looking for — we want to see how you reason about the agent loop, the tool surface, termination, and edge cases. Treat the panel as your team; ask us anything.

## The tools

Three async functions are exported from [`src/index.ts`](./src/index.ts) and ready to be wired up as tools the model can call:

- `read_schema(table)` — returns columns, types, primary key, foreign keys, indexes, and an estimated row count for a table.
- `count_rows(table)` — returns the estimated row count for a table.
- `find_referencing_consumers(table)` — returns the downstream services that read from this table, with the columns each one reads and a criticality label.

You decide how to declare these tools to the model, how to parse the model's tool calls, how to dispatch them, and how to feed the results back into the conversation. The schema is pre-parsed — you should not need to parse SQL DDL.

## The output

Your agent's terminal output for a given migration should be JSON of the form:

```json
{ "risk": "safe" | "risky" | "needs-coordination", "reasons": ["..."] }
```

You may add fields if you have a reason to. Tell us why.

## The dataset

Eight migrations live in [`migrations.json`](./migrations.json). Each case has an `id`, `sql`, `description`, and — where we have one — an `expected` label with `risk` and `reasons`. Two cases are unlabeled edge cases.

## Guidelines

- Use any language, runtime, and LLM you are comfortable with.
- You may modify, extend, or replace the dataset, the schema, or the consumer map.
- You may modify the tool surface if you have a reason to — tell us why.
- Treat the panel as your team. Ask clarifying questions, push back, request things.

## Setup

If you brought your own tooling (Claude Code, Cursor, a local repo, etc.), use it. Otherwise tell us and we will provision an API token and a scratch environment.

A minimal TypeScript scaffold is provided in [`src/index.ts`](./src/index.ts) — `getClient`, `callModel`, `loadPrompt`, `loadMigration`, and the three tool implementations. It expects `GEMINI_API_KEY` in the environment and will throw if it is missing. Use it, ignore it, rewrite it, or work in another language entirely.

```
npm install
export GEMINI_API_KEY=...
```

### Possible run commands

Using `tsx`:

```
GEMINI_API_KEY=... npx tsx src/index.ts
```

Using `tsc`:

```
npx tsc && GEMINI_API_KEY=... node dist/index.js
```
