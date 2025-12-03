import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  // on laisse Prisma lire DATABASE_URL dans process.env
});
