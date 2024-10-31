import db from "./db";
import { setup } from "./setup";

// Run the setup function when the app starts
(async () => {
  await setup(db);
})();