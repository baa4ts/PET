-- CreateTable
CREATE TABLE "Usuario" (
    "cedula" TEXT NOT NULL PRIMARY KEY,
    "primer_nombre" TEXT NOT NULL,
    "segundo_nombre" TEXT,
    "primer_apellido" TEXT NOT NULL,
    "segundo_apellido" TEXT,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "rol" TEXT NOT NULL DEFAULT 'NONE',
    "passhash" TEXT NOT NULL,
    "creado_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" JSONB NOT NULL,
    "creado_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vencimiento" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Session_vencimiento_idx" ON "Session"("vencimiento");
