import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";

export function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  return new GoogleGenAI({ apiKey });
}

export async function callModel(
  prompt: string,
  model: string = "gemini-2.5-flash-lite"
): Promise<string> {
  const response = await getClient().models.generateContent({
    model,
    contents: prompt,
  });
  return response.text ?? "";
}

export function loadPrompt(
  path: string,
  vars: Record<string, string> = {}
): string {
  return Object.entries(vars).reduce(
    (template, [key, value]) => template.split(`{${key}}`).join(value),
    readFileSync(path, "utf8")
  );
}

type Side = "processor" | "internal";

type Entry = {
  id: string;
  date: string;
  amount_cents: number;
  side: Side;
  raw: Record<string, unknown>;
};

const PROCESSOR: Entry[] = JSON.parse(
  readFileSync("./processor_ledger.json", "utf8")
).map((row: Record<string, unknown>) => ({
  id: row.id as string,
  date: row.date as string,
  amount_cents: row.amount_cents as number,
  side: "processor",
  raw: row,
}));

const INTERNAL: Entry[] = readFileSync("./internal_ledger.csv", "utf8")
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const [id, posted_date, member_id, amount, type, note] = line.split(",");
    return {
      id,
      date: posted_date,
      amount_cents: Math.round(parseFloat(amount) * 100),
      side: "internal" as Side,
      raw: { id, posted_date, member_id, amount, type, note },
    };
  });

const MATCHED = new Set<string>();

function inDateRange(entry: Entry, range?: { from: string; to: string }): boolean {
  if (!range) return true;
  return entry.date >= range.from && entry.date <= range.to;
}

export async function list_unmatched(
  side: Side,
  date_range?: { from: string; to: string }
): Promise<Entry[]> {
  const source = side === "processor" ? PROCESSOR : INTERNAL;
  return source.filter((e) => !MATCHED.has(e.id) && inDateRange(e, date_range));
}

export async function find_groups_summing_to(
  side: Side,
  target_cents: number,
  tolerance_cents: number,
  max_group_size: number,
  date_range?: { from: string; to: string }
): Promise<{ group_ids: string[]; sum_cents: number; truncated: boolean }[]> {
  const pool = (await list_unmatched(side, date_range));
  const results: { group_ids: string[]; sum_cents: number; truncated: boolean }[] = [];
  const cap = 20;

  function search(start: number, picked: Entry[], sum: number) {
    if (results.length >= cap) return;
    if (picked.length > 0 && Math.abs(sum - target_cents) <= tolerance_cents) {
      results.push({ group_ids: picked.map((p) => p.id), sum_cents: sum, truncated: false });
    }
    if (picked.length >= max_group_size) return;
    for (let i = start; i < pool.length; i++) {
      search(i + 1, [...picked, pool[i]], sum + pool[i].amount_cents);
      if (results.length >= cap) return;
    }
  }
  search(0, [], 0);

  const truncated = results.length >= cap;
  return results.map((r) => ({ ...r, truncated }));
}

export async function commit_match(
  processor_ids: string[],
  internal_ids: string[],
  reason: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (processor_ids.length === 0 && internal_ids.length === 0) {
    return { ok: false, error: "Both sides empty" };
  }
  for (const id of [...processor_ids, ...internal_ids]) {
    if (MATCHED.has(id)) {
      return { ok: false, error: `Already matched: ${id}` };
    }
  }
  const sumA = processor_ids.reduce(
    (s, id) => s + (PROCESSOR.find((e) => e.id === id)?.amount_cents ?? NaN),
    0
  );
  const sumB = internal_ids.reduce(
    (s, id) => s + (INTERNAL.find((e) => e.id === id)?.amount_cents ?? NaN),
    0
  );
  if (Number.isNaN(sumA) || Number.isNaN(sumB)) {
    return { ok: false, error: "Unknown id" };
  }
  if (Math.abs(sumA - sumB) > 100) {
    return { ok: false, error: `Sum mismatch: processor=${sumA} internal=${sumB}` };
  }
  for (const id of [...processor_ids, ...internal_ids]) MATCHED.add(id);
  void reason;
  return { ok: true };
}

// Example usage
if (require.main === module) {
  (async () => {
    const settlements = await list_unmatched("processor");
    console.log(`Loaded ${settlements.length} unmatched processor entries.`);
    const reply = await callModel(
      `Summarize this ledger entry in one short sentence: ${JSON.stringify(settlements[0].raw)}`
    );
    console.log(reply);
  })();
}
