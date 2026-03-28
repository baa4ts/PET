import { token } from "morgan";
import z from "zod";

export const SchemeLogin = z.object({
  cedula: z.string(),
  password: z.string(),
});

export const SchemeRegister = z.object({
  cedula: z.string().min(1),

  primer_nombre: z.string().min(1),
  segundo_nombre: z.string().optional(),

  primer_apellido: z.string().min(1),
  segundo_apellido: z.string().optional(),

  email: z.string().email(),
  telefono: z.string().optional(),

  password: z.string().min(8),
});

export const SchemeRefresh = z.object({
  token: z
    .string()
    .jwt()
    .startsWith("Bearer ")
    .transform((v) => v.split(" ")[1]),
});

export type tRegister = z.infer<typeof SchemeRegister>;
export type tLogin = z.infer<typeof SchemeLogin>;
export type tRefresh = z.infer<typeof SchemeLogin>;
