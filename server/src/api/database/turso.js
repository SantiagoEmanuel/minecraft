import { createClient } from "@libsql/client";
import dotenv from "dotenv";
dotenv.config();

export const db = createClient({
  url: "libsql://minecraft-santiagoemanuel.aws-us-east-1.turso.io",
  authToken: process.env.DATABASE_TOKEN,
});
