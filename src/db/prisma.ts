import { PrismaClient } from '@prisma/client';

// Lazily-constructed singleton. PrismaClient's constructor loads the query
// engine binary, which requires DATABASE_URL to be valid and the engine to
// be available — so we defer construction until something actually needs
// the database. This keeps DB-independent code (e.g. the health check, or
// pure validation functions) importable and testable without a live DB.
let client: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
}
