import { Request, Response, Router } from "express";
import { SessionCheck, SessionLevelsCheck } from "../../../middleware/Session";
import { SchemeEventos } from "./eventos.scheme";
import { conPrisma } from "../../../prestamos/conPrisma";


/**
 * Instancia
 */
const API = Router();

API.post('/',

    /**
     * Chain of Responsibility
     */
    SessionCheck,
    SessionLevelsCheck(["0"]),

    // Logica principal del end-point
    async (req: Request, res: Response) => {
        // Usuario es implicito
        const usuario = req.usuario!;

        const { data, success, error } = SchemeEventos.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ message: error, id: null });
        }

        try {
            const resultado = await conPrisma(async (p) =>
                p.eventos.create({
                    data: {
                        nombre: data.nombre,
                        descripcion: data.descripcion,
                        fecha: data.fecha,
                        usuarioCedula: usuario.cedula
                    },
                    select: {
                        id: true
                    }
                })
            );

            return res.status(201).json({ message: "OK", id: resultado.id });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Error al crear el evento", id: null });
        }
    });

API.get("/", async (req: Request, res: Response) => {
    try {
        const ahora = new Date();

        const eventos = await conPrisma(async (p) =>
            p.eventos.findMany({
                where: {
                    fecha: { gte: ahora }
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
            })
        );

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({
                message: "No hay eventos disponibles",
                eventos: null
            });
        }

        return res.status(200).json({
            message: "OK",
            eventos
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            eventos: null
        });
    }
});

/**
 * Exports
 */
export { API as RouteEventos };