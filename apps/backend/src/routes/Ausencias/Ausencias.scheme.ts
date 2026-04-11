import { z } from "zod"

export const AusenciaSchema = z.object({
    materia:    z.string().min(1),
    docenteId:  z.string().min(1),
})

export type Ausencia = z.infer<typeof AusenciaSchema>