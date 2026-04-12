import { createAccessControl } from "better-auth/plugins"

/**
 * Definicion de recursos y acciones disponibles
 */
export const statement = {
    ausencias: ["crear", "editar", "eliminar"],
    eventos: ["crear", "editar", "eliminar"],
    noticias: ["crear", "editar", "eliminar"],
} as const

/**
 * Control de acceso basado en roles
 */
export const accessControl = createAccessControl(statement)

/**
 * Rol root — acceso total
 */
export const AdminRole = accessControl.newRole({
    ausencias: ["crear", "editar", "eliminar"],
    eventos: ["crear", "editar", "eliminar"],
    noticias: ["crear", "editar", "eliminar"],
})

/**
 * Rol para gestionar noticias
 */
export const noticiasRole = accessControl.newRole({
    noticias: ["crear", "editar", "eliminar"],
})

/**
 * Rol para gestionar ausencias
 */
export const ausenciasRole = accessControl.newRole({
    ausencias: ["crear", "editar", "eliminar"],
})

/**
 * Rol para gestionar eventos
 */
export const eventosRole = accessControl.newRole({
    eventos: ["crear", "editar", "eliminar"],
})