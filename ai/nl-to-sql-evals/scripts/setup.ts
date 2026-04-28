import Database from "better-sqlite3";
import { existsSync, readFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(__dirname, "..");
const DB_PATH = resolve(ROOT, "store.db");
const SCHEMA_PATH = resolve(ROOT, "schema.sql");

const COUNTRIES: Array<[number, string]> = [
  [10, "US"],
  [15, "GB"],
  [20, "CA"],
  [25, "DE"],
  [30, "FR"],
];

const CATEGORIES: Array<[number, string]> = [
  [5, "electronics"],
  [10, "apparel"],
  [15, "home"],
];

const STATUSES = ["completed", "completed", "pending", "cancelled", "completed"];
const ORDERED_AT = ["2026-03-15", "2026-04-10", "2026-02-20", "2026-03-28", "2026-04-05"];

function countryFor(id: number): string {
  for (const [maxId, country] of COUNTRIES) {
    if (id <= maxId) return country;
  }
  throw new Error(`No country for user id ${id}`);
}

function categoryFor(id: number): string {
  for (const [maxId, category] of CATEGORIES) {
    if (id <= maxId) return category;
  }
  throw new Error(`No category for product id ${id}`);
}

function build(): void {
  if (existsSync(DB_PATH)) {
    unlinkSync(DB_PATH);
  }

  const db = new Database(DB_PATH);
  try {
    db.exec(readFileSync(SCHEMA_PATH, "utf8"));

    const insertUser = db.prepare(
      "INSERT INTO users (id, email, created_at, country) VALUES (?, ?, ?, ?)"
    );
    const insertProduct = db.prepare(
      "INSERT INTO products (id, name, price_cents, category) VALUES (?, ?, ?, ?)"
    );
    const insertOrder = db.prepare(
      "INSERT INTO orders (id, user_id, product_id, quantity, ordered_at, status) VALUES (?, ?, ?, ?, ?, ?)"
    );

    const seed = db.transaction(() => {
      for (let id = 1; id <= 30; id++) {
        const email = `user${id.toString().padStart(2, "0")}@example.com`;
        insertUser.run(id, email, "2026-01-01", countryFor(id));
      }
      for (let id = 1; id <= 15; id++) {
        const name = `Product ${String.fromCharCode(64 + id)}`;
        insertProduct.run(id, name, id * 1000, categoryFor(id));
      }
      for (let id = 1; id <= 150; id++) {
        const userId = ((id - 1) % 25) + 1;
        const productId = ((id - 1) % 15) + 1;
        const quantity = productId;
        const status = STATUSES[(id - 1) % 5];
        const orderedAt = ORDERED_AT[(id - 1) % 5];
        insertOrder.run(id, userId, productId, quantity, orderedAt, status);
      }
    });
    seed();
  } finally {
    db.close();
  }
}

build();
