# Ledger Reconciliation Agent

This is a live-coding exercise for AI Platform Engineer candidates.

The candidate may use any process of their choosing: any language, any agent, any LLM -- or none at all if you prefer. TypeScript is a sensible default. Bring your own Claude / Cursor / etc., or we can provision a Gemini API key at the start of the session.

## The task

You are a Platform Engineer who accelerates other team's AI implementations. The Operations team reconciles our internal ledger against the card processor's settlement file every morning. The two systems were built by different vendors at different times and they reflect activity at different granularity — the processor's file shows one entry per settlement (an omnibus aggregate), our internal ledger shows one entry per member's virtual account. IDs do not survive the boundary, the internal ledger is exported by hand from a spreadsheet that an analyst maintains, and we are not always sure what to do with bursts of identical-amount transactions on the same day. Ops is currently doing this reconciliation by eye in Excel and they are tired.

**Your job is to build an agent loop that reconciles the two ledgers and produces (a) a list of committed matches and (b) a list of entries that cannot be matched, with a reason.**

The processor's settlements live in [`processor_ledger.json`](./processor_ledger.json). The internal ledger lives in [`internal_ledger.csv`](./internal_ledger.csv). The panel's expected match set lives in [`expected_matches.json`](./expected_matches.json) — you may use it to self-test, and we will grade against it.

Think out loud. There is no "finished" state we are looking for — we want to see how you reason about the agent loop, the tool surface, search, confidence, and termination. Treat the panel as your team; ask us anything.

## The data

- [`processor_ledger.json`](./processor_ledger.json): 8 omnibus-level settlements emitted by the card processor. Clean, machine-generated. Amounts in integer cents.
- [`internal_ledger.csv`](./internal_ledger.csv): 11 per-virtual-account entries from our internal ledger. Hand-typed-feeling. Amounts in dollar-decimal (parse to cents on load).
- [`expected_matches.json`](./expected_matches.json): the ground-truth match set with category labels (`1:1`, `M:N aggregation`, `burst`, `unmatched`, `1:1 with date variance`).

The two ledgers cover the same business activity over five days (2026-04-15 to 2026-04-19) but represent it at different granularity. Some processor entries correspond to a single internal entry; some correspond to many internal entries that sum to the processor's amount; some have no internal counterpart at all.

## The tools

Three async functions are exported from [`src/index.ts`](./src/index.ts) and ready to be wired up as tools the model can call:

- `list_unmatched(side, date_range?)` — returns the still-unmatched entries on the given side (`"processor"` or `"internal"`), optionally filtered by date range.
- `find_groups_summing_to(side, target_cents, tolerance_cents, max_group_size, date_range?)` — searches the unmatched entries on `side` for groupings of 1..`max_group_size` entries whose amounts sum to `target_cents` ± `tolerance_cents`. Returns up to 20 candidate groupings; if the search would return more, it returns the first 20 and indicates truncation. Use this when you have a target amount and you want plausible groups on the other side.
- `commit_match(processor_ids, internal_ids, reason)` — atomically validates the proposed match (all ids must currently be unmatched; sums on each side must be equal within tolerance) and records it. Returns `{ ok: true }` on success or `{ ok: false, error: "..." }` on failure. Idempotent: re-committing the same match is an error, not a silent success.

You decide how to declare these tools to the model, how to parse the model's tool calls, how to dispatch them, and how to feed the results back into the conversation. State (which entries are matched) lives in-process and resets when the process restarts.

## The output

Your agent's final terminal output should be two lists:

1. **Committed matches.** Either obtained by calling `list_unmatched` after the loop terminates and reporting the diff, or accumulated as the agent commits.
2. **Flagged unmatchable entries.** Entries the agent has decided cannot be confidently matched, with a reason.

Format is up to you — JSON is sensible. Tell us why you chose what you chose.

## Guidelines

- Use any language, runtime, and LLM you are comfortable with.
- You may modify, extend, or replace the dataset, the ledgers, or the tool surface.
- You may decide to skip the LLM entirely on certain entries (e.g., obvious 1:1 by amount + date + narrative). Tell us why and where you draw the line.
- Treat the panel as your team. Ask clarifying questions, push back, request things.

## Setup

If you brought your own tooling (Claude Code, Cursor, a local repo, etc.), use it. Otherwise tell us and we will provision an API token and a scratch environment.

A minimal TypeScript scaffold is provided in [`src/index.ts`](./src/index.ts) — `getClient`, `callModel`, `loadPrompt`, the three tool implementations, and CSV/JSON load helpers. It expects `GEMINI_API_KEY` in the environment and will throw if it is missing. Use it, ignore it, rewrite it, or work in another language entirely.

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
