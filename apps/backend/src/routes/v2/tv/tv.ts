import { Request, Response, Router } from "express";
import { conPrisma } from "../../../prestamos/conPrisma";
import { domainToASCII } from "node:url";

/**
 * Instancia
 */
const API = Router();

API.get('/', async (req: Request, res: Response) => {
    try {
        const [noticias, eventos, ausencias] = await conPrisma(async (p) =>
            p.$transaction([

                // Consulta para noticias
                p.noticia.findMany({
                    where: {
                        publicado: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
                    },
                    select: {
                        id: true,
                        titulo: true,
                        descripcion: true,
                        recursos: {
                            select: {
                                resource: true
                            }
                        }
                    },
                    orderBy: {
                        publicado: "desc"
                    }
                }),

                // Consulta para eventos
                p.eventos.findMany({
                    where: {
                        fecha: { gte: new Date() }
                    },
                    select: {
                        id: true,
                        nombre: true,
                        descripcion: true,
                        fecha: true,
                        usuario: { select: { primer_nombre: true, primer_apellido: true } }
                    },
                    orderBy: {
                        fecha: "asc"
                    }
                }),

                // Consultas para ausencias
                p.ausencia.findMany({
                    where: {
                        creado: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
                    },
                    select: {
                        materia: true,
                        usuario: {
                            select: { primer_nombre: true, primer_apellido: true }
                        }
                    },
                    orderBy: { creado: "desc" }
                })
            ])
        )

        return res.status(200).json({ message: "OK", datos: { noticias, eventos, ausencias } })
    } catch (error) {
        return res.status(500).json({ message: "Error en el servidor", datos: null })
    }

});

/**
 * Exports
 */
export { API as RouteTv };