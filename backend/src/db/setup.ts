import type { DB } from "./db";
import { seed } from "./seed";
import { createTables } from "./tables";

// Run the setup function when the app starts
export const setup = async (db: DB) => {
  await createTables(db);
  await seed(db);
};