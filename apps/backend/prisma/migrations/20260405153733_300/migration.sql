-- CreateTable
CREATE TABLE "Ausencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "materia" TEXT NOT NULL,
    "usuarioCedula" TEXT NOT NULL,
    "creado" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ausencia_usuarioCedula_fkey" FOREIGN KEY ("usuarioCedula") REFERENCES "Usuario" ("cedula") ON DELETE RESTRICT ON UPDATE CASCADE
);
