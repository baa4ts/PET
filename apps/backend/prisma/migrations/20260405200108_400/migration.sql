/*
  Warnings:

  - Added the required column `publicadorCedula` to the `Ausencia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ausencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "materia" TEXT NOT NULL,
    "usuarioCedula" TEXT NOT NULL,
    "publicadorCedula" TEXT NOT NULL,
    "creado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ausencia_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ausencia_publicadorCedula_fkey" FOREIGN KEY ("publicadorCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ausencia" ("creado", "id", "materia", "usuarioCedula") SELECT "creado", "id", "materia", "usuarioCedula" FROM "Ausencia";
DROP TABLE "Ausencia";
ALTER TABLE "new_Ausencia" RENAME TO "Ausencia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
