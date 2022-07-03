import "dirnamejz";
import { Low, JSONFile } from "lowdb";
import { join } from "path";

let db;

export async function createConnection() {
  // Use JSON file for storage
  const file = join(__dirnamejz, "../db.json");
  const adapter = new JSONFile(file);
  db = new Low(adapter);

  // Read data from JSON file, this will set db.data content
  await db.read();

  db.data ||= { tasks: [] };
  // Write db.data content to db.json
  await db.write();
}

export const getConnection = () => db;
