import { z } from "zod"

export const NoticiaSchema = z.object({
    titulo:      z.string().min(1),
    descripcion: z.string().min(1),
})

export type Noticia = z.infer<typeof NoticiaSchema>