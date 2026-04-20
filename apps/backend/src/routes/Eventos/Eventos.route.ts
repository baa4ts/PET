import { Request, Response, Router } from "express";

import { prisma } from "@/configuracion/Prisma";
import { requierePermiso } from "@/middlewares/Auth.middleware";

import { EventoSchema } from "./Eventos.scheme";
import { parsePagination } from "@/Helpers/Args";

/**
 *
 * Instancia
 * 
 */
const API = Router();


API.get("/", async (req: Request, res: Response) => {
    const { limit, offset } = parsePagination(req.query)

    try {
        const [resultados, total] = await prisma.$transaction([
            prisma.eventos.findMany({
                where: { fecha: { gte: new Date() } },
                orderBy: { fecha: "asc" },
                omit: { userId: true },
                take: limit,
                skip: offset
            }),
            prisma.eventos.count({
                where: { fecha: { gte: new Date() } }
            })
        ])

        const meta = { total, limit, offset }

        if (resultados.length === 0) {
            return res.status(200).json({ mensaje: "No hay eventos disponibles", meta, eventos: [] })
        }

        return res.status(200).json({ mensaje: "OK", meta, eventos: resultados })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor", meta: { total: 0, limit, offset }, eventos: null })
    }
})


API.post("/", requierePermiso("eventos", "crear"), async (req: Request, res: Response) => {

    const resp = EventoSchema.safeParse(req.body)

    if (!resp.success) {
        return res.status(400).json({ mensaje: "Datos invalidos", eventos: null })
    }

    try {
        // Crear el evento
        const response = await prisma.eventos.create({
            data: {
                ...resp.data,
                userId: req.user!.id
            },
            omit: { userId: true }
        })

        return res.status(201).json({ mensaje: "Evento creado", eventos: [response] })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor", eventos: null })
    }
})


/**
 *
 * Export
 * 
 */
export { API as ApiEventos }