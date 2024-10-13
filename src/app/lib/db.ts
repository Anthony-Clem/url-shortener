import { PrismaClient } from "@prisma/client";

// Create a new PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Extend the global object to hold the Prisma client instance
declare global {
  const prisma: PrismaClientSingleton | undefined;
}

// Initialize the Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Export the Prisma client
export default prisma;

// Store the client instance in the global object in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
