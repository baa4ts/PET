/*
  Warnings:

  - You are about to drop the column `rol` on the `Usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "cedula" TEXT NOT NULL PRIMARY KEY,
    "primer_nombre" TEXT NOT NULL,
    "segundo_nombre" TEXT,
    "primer_apellido" TEXT NOT NULL,
    "segundo_apellido" TEXT,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "permisos" TEXT NOT NULL DEFAULT '0',
    "passhash" TEXT NOT NULL,
    "creado_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_at" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("actualizado_at", "cedula", "creado_at", "email", "passhash", "primer_apellido", "primer_nombre", "segundo_apellido", "segundo_nombre", "telefono") SELECT "actualizado_at", "cedula", "creado_at", "email", "passhash", "primer_apellido", "primer_nombre", "segundo_apellido", "segundo_nombre", "telefono" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
