import z from "zod";

export const SchemeAusencias = z.object({
    cedula: z.string(),
    materia: z.string()
})

export type tAusencia = z.infer<typeof SchemeAusencias>;