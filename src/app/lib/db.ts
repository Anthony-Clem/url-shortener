import { PrismaClient } from "@prisma/client";

// Add this to globalThis if it doesn't exist already
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton Prisma client instance
const prisma = global.prisma || new PrismaClient();

// Ensure the Prisma client is not reinitialized during hot reloading in development
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
