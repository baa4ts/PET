import { Request, Response, Router } from "express";
import { SessionCheck, SessionLevelsCheck } from "../../../middleware/Session";
import { SchemeAusencias } from "./ausencias.scheme";
import { conPrisma } from "../../../prestamos/conPrisma";

/**
 * Instancia
 */
const API = Router();

API.post("/",
    SessionCheck,
    SessionLevelsCheck(["0"]),

    async (req: Request, res: Response) => {
        const { data, success, error } = SchemeAusencias.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ message: error, id: null });
        }

        try {
            const resultado = await conPrisma(async (p) =>
                p.ausencia.create({
                    data: {
                        materia: data.materia,
                        usuarioCedula: data.cedula,
                        publicadorCedula: req.usuario?.cedula!
                    },
                    select: {
                        id: true
                    }
                })
            );

            return res.status(201).json({ message: "OK", id: resultado.id });

        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Error al crear la ausencia", id: null });
        }
    })

API.get("/", async (req: Request, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;

        const ausencias = await conPrisma(async (p) =>
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
                orderBy: { creado: "desc" },
                take: limit,
                skip: offset
            })
        );

        if (!ausencias || ausencias.length === 0) {
            return res.status(404).json({
                message: "No hay ausencias en las ultimas 24 horas",
                ausencias: null
            });
        }

        return res.status(200).json({
            message: "OK",
            ausencias
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            ausencias: null
        });
    }
});

/**
 * Exports
 */
export { API as RouteAusencias };