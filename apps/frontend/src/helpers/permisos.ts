export const parsearPermisos = (permisos: null | string | undefined): Permisos | undefined => {
    if (!permisos) return undefined

    // Si ya es un objeto
    if (typeof permisos === "object") return permisos as Permisos

    // Si no es objeto, se lo convierte a objeto
    try {
        return JSON.parse(permisos) as Permisos
    } catch {
        return undefined
    }
}

// Verificar si tiene la clave a esa tabla
export const tienePermiso = (permisos: Permisos | undefined, recurso: string): boolean => {
    if (!permisos) return false
    return recurso in permisos
}

// Verificar los permisos internos a la tabla
export const obtenerAcciones = (permisos: Permisos | undefined, recurso: string): string[] => {
    if (!permisos) return []
    return permisos[recurso] ?? []
}