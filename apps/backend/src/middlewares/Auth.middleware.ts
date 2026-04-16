import { fromNodeHeaders } from "better-auth/node"
import { NextFunction, Request, Response } from "express"
import { auth, Permisos } from "@/configuracion/Auth"

/** Verifica sesion activa */
export async function requiereAuth(req: Request, res: Response, next: NextFunction) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    })

    if (!session) return res.status(401).json({ mensaje: "No autorizado" })

    // Inyectamos en el request para uso posterior
    req.user = session.user
    req.session = session.session
    next()
}

/** Verifica permiso sobre un recurso dinamico */
export function requierePermiso(recurso: string, accion: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        })

        if (!session) return res.status(401).json({ mensaje: "No autorizado" })

        // El objeto permisos ya viene parseado gracias al customSession
        const permisos = (session.user as any).permisos as Permisos

        // Verificamos si el recurso existe y si tiene la accion permitida
        const tienePermiso = permisos[recurso]?.includes(accion)

        if (!tienePermiso) {
            return res.status(403).json({ mensaje: `Sin permisos para ${accion} en ${recurso}` })
        }

        req.user = session.user
        next()
    }
}