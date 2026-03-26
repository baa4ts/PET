import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

/**
 * Ejecuta una funcion con Prisma y retorna su resultado.
 *
 * @param fn Funcion que recibe la instancia de Prisma y devuelve algo.
 * @returns El resultado de la funcion `fn`.
 */
export const conPrisma = async <T>(fn: (prisma: PrismaClient) => Promise<T> ): Promise<T> => {
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    return await fn(prisma);
  } finally {
    await prisma.$disconnect();
  }
};
