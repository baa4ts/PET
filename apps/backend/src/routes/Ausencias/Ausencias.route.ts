import { Request, Response, Router } from "express";

import { prisma } from "@/configuracion/Prisma";
import { requiereAuth, requierePermiso } from "@/middlewares/Auth.middleware";

import { AusenciaSchema } from "./Ausencias.scheme";

/**
 *
 * Instancia
 * 
 */
const API = Router();

/**
 * model Ausencia {
 *   id      Int      @id @default(autoincrement())
 *   materia String
 *   creado  DateTime @default(now())
 *
 *   // Docente que falta
 *   docente   User   @relation(name: "AusenciaDocente", fields: [docenteId], references: [id])
 *   docenteId String
 *
 *   // Usuario que publica
 *   publicador   User   @relation(name: "AusenciaPublicador", fields: [publicadorId], references: [id])
 *   publicadorId String
 * }
 */


API.get("/", async (req: Request, res: Response) => {
    try {

        const resultados = await prisma.ausencia.findMany({
            orderBy: {
                creado: "desc",
            },
        })

        if (resultados.length === 0) {
            return res.status(200).json({ mensaje: "No hay ausencias disponibles", ausencias: [] })
        }

        return res.status(200).json({ mensaje: "OK", ausencias: resultados })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor", ausencias: null })
    }
})


API.post("/", requiereAuth, requierePermiso("ausencias", "crear"), async (req: Request, res: Response) => {

    const resp = AusenciaSchema.safeParse(req.body)

    if (!resp.success) {
        return res.status(400).json({ mensaje: "Datos invalidos", ausencias: null })
    }

    try {
        const response = await prisma.ausencia.create({
            data: {
                ...resp.data,
                publicadorId: req.user!.id,
            },
        })

        return res.status(201).json({ mensaje: "Ausencia creada", ausencias: [response] })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor", ausencias: null })
    }
})


/**
 *
 * Export
 * 
 */
export { API as ApiAusencias }