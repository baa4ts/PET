import z from "zod";

export const SchemeEventos = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date()
})

export type tEventos = z.infer<typeof SchemeEventos>;
