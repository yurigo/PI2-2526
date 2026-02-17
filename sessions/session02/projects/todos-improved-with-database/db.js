import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({ filename: "./todos.db", driver: sqlite3.Database });

await db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

const row = await db.get("SELECT COUNT(*) as count FROM todos");
if (!row || row.count === 0) {
  const seed = [
    "aprender node",
    "aprender javascript",
    "aprender express",
    "ver videos de node",
  ];
  for (const t of seed) {
    await db.run("INSERT INTO todos(text, done) VALUES(?, 0)", t);
  }
}

export default db;
