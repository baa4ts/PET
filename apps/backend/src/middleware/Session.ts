import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { conPrisma } from "../prestamos/conPrisma";

/**
 * Middleware para verificar si un usuario esta autenticado
 */
export const SessionCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // obtener token
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "no se proporciono el token" });
        }
        token = token.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

        // buscar sesion en db
        const session = await conPrisma((p) =>
            p.session.findFirst({ where: { key: payload.cedula } })
        );

        // comprobar sesion
        if (!session || new Date(session.vencimiento) < new Date()) {
            return res.status(401).json({ message: "sesion invalida o vencida" });
        }

        req.usuario = JSON.parse(session.value as any) as TypeSession;

        next();
    } catch {
        return res.status(401).json({ message: "token invalido o expirado" });
    }
};