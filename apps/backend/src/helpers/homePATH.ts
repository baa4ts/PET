import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs"

/**
 * Resuelve una ruta relativa al directorio de este archivo.
 * @param relative - Ruta a concatenar
 * @param create - Si es true, crea el directorio si no existe
 */
export function homePATH(relative: string, create = false): string {
    const full = path.join(path.dirname(fileURLToPath(import.meta.url)), relative)
    if (create && !fs.existsSync(full)) fs.mkdirSync(full, { recursive: true })
    return full
}