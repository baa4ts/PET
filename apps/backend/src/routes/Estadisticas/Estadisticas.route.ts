import { prisma } from "@/configuracion/Prisma";
import { requiereAuth } from "@/middlewares/Auth.middleware";
import { Request, Response, Router } from "express";

/**
 * Instancia
 */
const API = Router();

API.get('/',

    requiereAuth,

    async (req: Request, res: Response) => {
        try {
            const [eventos, noticias, ausencias, usuarios, sesiones] = await prisma.$transaction([
                prisma.eventos.count(),
                prisma.noticia.count(),
                prisma.ausencia.count(),
                prisma.user.count(),
                prisma.session.count()
            ])

            return res.status(200).json({
                mensaje: "OK",
                estadisticas: [
                    { eventos },
                    { noticias },
                    { ausencias },
                    { usuarios },
                    { sesiones }
                ]
            })
        } catch (error) {
            return res.status(500).json({ mensaje: "Error en el servidor", estadisticas: null })
        }
    });

/**
 * Exports
 */
export { API as RouteEstadisticas };