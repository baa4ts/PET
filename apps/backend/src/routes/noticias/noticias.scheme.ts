import z from "zod";

export const SchemeNuevaNoticia = z.object({
    titulo: z.string().nonempty(),
    descripcion: z.string().nonempty()
})

export type tNuevaNoticia = z.infer<typeof SchemeNuevaNoticia>;
