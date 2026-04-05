import { NextFunction, Request, Response, Router } from "express";
import { Archivos } from "../../middleware/Archivos";
import { SessionCheck } from "../../middleware/Session";
import { SchemeNuevaNoticia } from "./noticias.scheme";
import multer from "multer";
import { conPrisma } from "../../prestamos/conPrisma";

/**
 * Instancia
 */
const API = Router();

API.post("/",

    /**
     * Chain of Responsibility
     */

    SessionCheck,

    // Middleware para los archivos
    Archivos({
        formatos: ["image/jpeg", "image/png", "video/mp4", "image/gif"],
        maxFiles: 5,
        maxSizeFile: 25 * 1024 * 1024,
    }).array("recurso"),

    // Control de error custom para multer. snippet: multer-err
    (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof multer.MulterError) {
            const mensajes: Record<string, string> = {
                LIMIT_FILE_SIZE: "El archivo supera el tamano maximo permitido",
                LIMIT_FILE_COUNT: "Se supero el numero maximo de archivos",
                LIMIT_UNEXPECTED_FILE: "Campo de archivo inesperado",
            };
            return res.status(400).json({ message: mensajes[err.code] ?? err.message, id: null });
        }
        next();
    },

    // Logica principal del end-point
    async (req: Request, res: Response) => {
        try {
            const archivos = req.files as Express.Multer.File[];
            const { data, success } = SchemeNuevaNoticia.safeParse(req.body);
            const usuario = req.usuario!;

            if (!success)
                return res.status(400).json({ message: "Los datos del formulario no son correctos", id: null });

            // Validar que se envio al menos un archivo
            if (!archivos || archivos.length === 0)
                return res.status(400).json({ message: "No se enviaron archivos", id: null });

            const noticia = await conPrisma((p) =>
                p.noticia.create({
                    data: {
                        // Tabla de noticia
                        titulo: data.titulo,
                        descripcion: data.descripcion,
                        usuarioCedula: usuario.cedula,

                        // Tabla de recursos
                        recursos: {
                            create: archivos.map((a) => ({
                                resource: a.filename,
                                usuarioCedula: usuario.cedula,
                                es_noticia: true,
                            }))
                        }
                    },
                    select: { id: true }
                })
            );
            return res.status(201).json({ message: "Noticia creada exitosamente", id: noticia.id });
        } catch (_) {
            return res.status(500).json({ message: "Error al publicar la noticia", id: null });
        }
    }
);

/**
 * Exports
 */
export { API as RouteNoticias };