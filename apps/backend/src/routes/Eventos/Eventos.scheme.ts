import { z } from "zod"

export const EventoSchema = z.object({
    nombre: z.string().min(1),
    descripcion: z.string().min(1),
    fecha: z.coerce.date(),
})

export type Evento = z.infer<typeof EventoSchema>