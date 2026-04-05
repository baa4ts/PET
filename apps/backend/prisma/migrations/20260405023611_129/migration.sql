/*
  Warnings:

  - The primary key for the `Noticia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Noticia` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Recurso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Recurso` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `noticiaId` on the `Recurso` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Noticia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "publicado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCedula" TEXT NOT NULL,
    CONSTRAINT "Noticia_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Noticia" ("descripcion", "id", "publicado", "titulo", "usuarioCedula") SELECT "descripcion", "id", "publicado", "titulo", "usuarioCedula" FROM "Noticia";
DROP TABLE "Noticia";
ALTER TABLE "new_Noticia" RENAME TO "Noticia";
CREATE INDEX "Noticia_id_idx" ON "Noticia"("id");
CREATE TABLE "new_Recurso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resource" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "es_noticia" BOOLEAN NOT NULL DEFAULT false,
    "noticiaId" INTEGER,
    "usuarioCedula" TEXT NOT NULL,
    CONSTRAINT "Recurso_noticiaId_fkey" FOREIGN KEY ("noticiaId") REFERENCES "Noticia" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Recurso_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recurso" ("es_noticia", "fecha", "id", "noticiaId", "resource", "usuarioCedula") SELECT "es_noticia", "fecha", "id", "noticiaId", "resource", "usuarioCedula" FROM "Recurso";
DROP TABLE "Recurso";
ALTER TABLE "new_Recurso" RENAME TO "Recurso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
