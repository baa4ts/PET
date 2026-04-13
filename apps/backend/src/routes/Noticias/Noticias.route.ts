import { Request, Response, Router } from "express";

import { prisma } from "@/configuracion/Prisma";
import { Archivos } from "@/middlewares/Archivos.middleware";
import { requiereAuth, requierePermiso } from "@/middlewares/Auth.middleware";

import { NoticiaSchema } from "./Noticias.scheme";

/**
 *
 * Instancia
 * 
 */
const API = Router();


API.get("/", async (req: Request, res: Response) => {
    try {
        const resultados = await prisma.noticia.findMany({
            where: {
                publicado: {
                    // 24 Horas
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
                }
            },
            orderBy: {
                publicado: "desc",
            },
            include: {
                recursos: true
            },
            omit: {
                userId: true
            }
        })

        if (resultados.length === 0) {
            return res.status(200).json({ mensaje: "No hay noticias disponibles", noticias: [] })
        }

        return res.status(200).json({ mensaje: "OK", noticias: resultados })

    } catch (error) {
        return res.status(500).json({ mensaje: "Error en el servidor", noticias: null })
    }
})


API.post("/",

    /** Middlewares */
    requiereAuth,
    requierePermiso("noticias", "crear"),

    Archivos({
        formatos: [".jpg", ".jpeg", ".png", ".webp", ".pdf"],
        maxFiles: 5,
        maxSizeFile: 10 * 1024 * 1024, // 10mb
    }).array("recursos"),

    // Handle
    async (req: Request, res: Response) => {

        const resp = NoticiaSchema.safeParse(req.body)

        if (!resp.success) {
            return res.status(400).json({ mensaje: "Datos invalidos", noticias: null })
        }

        try {
            const response = await prisma.noticia.create({
                data: {
                    ...resp.data,
                    userId: req.user!.id,
                    recursos: {
                        create: (req.files as Express.Multer.File[] ?? []).map(file => ({
                            resource: file.filename,
                            es_noticia: true,
                            userId: req.user!.id,
                        }))
                    }
                },
                include: {
                    recursos: true
                },
                omit: {
                    userId: true
                }
            })

            return res.status(201).json({ mensaje: "Noticia creada", noticias: [response] })

        } catch (error) {
            return res.status(500).json({ mensaje: "Error en el servidor", noticias: null })
        }
    })


/**
 *
 * Export
 * 
 */
export { API as ApiNoticias }