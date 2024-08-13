import { createClient } from "@libsql/client";
import dotenv from "dotenv";
dotenv.config();

export const db = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_TOKEN,
});
