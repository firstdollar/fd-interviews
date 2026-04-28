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

const SCHEMA = JSON.parse(readFileSync("./schema.json", "utf8"));
const CONSUMERS = JSON.parse(readFileSync("./consumers.json", "utf8"));
const MIGRATIONS = JSON.parse(readFileSync("./migrations.json", "utf8"));

export async function read_schema(table: string): Promise<unknown> {
  return SCHEMA[table] ?? null;
}

export async function count_rows(table: string): Promise<number | null> {
  return SCHEMA[table]?.row_count_estimate ?? null;
}

export async function find_referencing_consumers(table: string): Promise<unknown[]> {
  return CONSUMERS[table] ?? [];
}

export function loadMigration(id: string): unknown {
  return MIGRATIONS.find((m: { id: string }) => m.id === id) ?? null;
}

// Example usage
if (require.main === module) {
  const m = loadMigration("01") as { id: string; sql: string };
  callModel(`Explain in one sentence what this SQL does:\n\n${m.sql}`).then(console.log);
}
