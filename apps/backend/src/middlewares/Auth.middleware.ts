import { fromNodeHeaders } from "better-auth/node"
import { NextFunction,Request, Response } from "express"

import { auth } from "@/configuracion/Auth"
import { statement } from "@/configuracion/Roles"

type Recurso = keyof typeof statement
type Accion = "crear" | "editar" | "eliminar"

/** Verifica sesion activa */
export async function requiereAuth(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (!session) return res.status(401).json({ mensaje: "No autorizado" })

  req.user = session.user
  req.session = session.session
  next()
}

/** Verifica permiso sobre un recurso */
export function requierePermiso(recurso: Recurso, accion: Accion) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })

    if (!session) return res.status(401).json({ mensaje: "No autorizado" })

    const result = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { [recurso]: [accion] },
      }
    })

    if (!result.success) return res.status(403).json({ mensaje: "Sin permisos" })

    req.user = session.user
    next()
  }
}

/** Verifica que el usuario sea root — usar siempre despues de requireAuth */
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (!session) return res.status(401).json({ mensaje: "No autorizado" })

  const result = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        noticias: ["crear", "editar", "eliminar"],
        ausencias: ["crear", "editar", "eliminar"],
        eventos: ["crear", "editar", "eliminar"],
      }
    }
  })

  if (!result.success) return res.status(403).json({ mensaje: "Sin permisos" })

  req.user = session.user
  next()
}