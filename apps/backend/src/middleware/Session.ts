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

        if (!session || new Date(session.vencimiento).getTime() < Date.now())
            return res.status(401).json({ message: "sesion invalida o vencida" });

        req.usuario = session.value as unknown as TypeSession;

        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: "token invalido o expirado" });
    }
};

/**
 * Middleware para verificar si el usuario tiene alguno de los roles requeridos
 * @requires {@link SessionCheck} debe ejecutarse antes en la cadena de middlewares
 */
export const SessionLevelsCheck = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const usuario = req.usuario;

        if (!usuario || !usuario.permisos) {
            return res.status(401).json({ message: "sesion invalida" });
        }

        const userRoles = usuario.permisos.split(',');
        const check = roles.some(role => userRoles.includes(role));

        if (!check) {
            return res.status(403).json({ message: "permisos insuficientes" });
        }

        next();
    }
}