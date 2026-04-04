/*
  Warnings:

  - You are about to drop the column `passhash` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `pass_hash` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "usuarioCedula" TEXT NOT NULL,
    CONSTRAINT "Noticia_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recurso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "resource" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "es_noticia" BOOLEAN NOT NULL DEFAULT false,
    "noticiaId" TEXT,
    "usuarioCedula" TEXT NOT NULL,
    CONSTRAINT "Recurso_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recurso_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "pass_hash" TEXT NOT NULL,
    "creado_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_at" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("actualizado_at", "cedula", "creado_at", "email", "permisos", "primer_apellido", "primer_nombre", "segundo_apellido", "segundo_nombre", "telefono") SELECT "actualizado_at", "cedula", "creado_at", "email", "permisos", "primer_apellido", "primer_nombre", "segundo_apellido", "segundo_nombre", "telefono" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Noticia_slug_key" ON "Noticia"("slug");

-- CreateIndex
CREATE INDEX "Noticia_slug_id_idx" ON "Noticia"("slug", "id");
