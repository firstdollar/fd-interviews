import { GoogleGenAI } from "@google/genai";
import Database from "better-sqlite3";
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

export function openDB(path: string = "./store.db"): Database.Database {
  return new Database(path, { readonly: true });
}

// Example usage
if (require.main === module) {
  const schema = readFileSync("./schema.sql", "utf8");
  callModel(
    loadPrompt("./prompt.txt", { schema, question: "How many users are there?" })
  ).then(console.log);
}
