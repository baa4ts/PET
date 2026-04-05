/*
  Warnings:

  - You are about to drop the column `slug` on the `Noticia` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "publicado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioCedula" TEXT NOT NULL,
    CONSTRAINT "Noticia_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Noticia" ("descripcion", "id", "titulo", "usuarioCedula") SELECT "descripcion", "id", "titulo", "usuarioCedula" FROM "Noticia";
DROP TABLE "Noticia";
ALTER TABLE "new_Noticia" RENAME TO "Noticia";
CREATE INDEX "Noticia_id_idx" ON "Noticia"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
