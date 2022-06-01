import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.info("Database: Connected"))
  .catch((err) => console.error("Database: Error"+err));
