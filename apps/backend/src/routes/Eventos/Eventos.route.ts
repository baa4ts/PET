import { Request, Response, Router } from "express";

import { prisma } from "@/configuracion/Prisma";
import { requiereAuth, requierePermiso } from "@/middlewares/Auth.middleware";

import { EventoSchema } from "./Eventos.scheme";
import { parsePagination } from "@/Helpers/ParsePagination";

/**
 *
 * Instancia
 * 
 */
const API = Router();


API.get("/", async (req: Request, res: Response) => {
    try {
        const { limit, offset } = parsePagination(req.query)

        const resultados = await prisma.eventos.findMany({
            // Filtrar por los eventos que no hayan vencido aun
            where: {
                fecha: {
                    gte: new Date()
                }
            },

            // Ordenarlos por los que estan mas proximos aun
            orderBy: {
                fecha: "asc",
            },
            omit: {
                userId: true
            },
            take: limit,
            skip: offset
        })

        if (resultados.length === 0) {
            return res.status(200).json({ mensaje: "No hay eventos disponibles", eventos: [] })
        }

        return res.status(200).json({ mensaje: "OK", eventos: resultados })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor", eventos: null })
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