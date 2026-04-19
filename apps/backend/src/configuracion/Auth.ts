import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { openAPI, customSession } from "better-auth/plugins"
import { prisma } from "./Prisma"

export interface Permisos {
    [key: string]: string[]
}

/**
 * Gestor de autenticacion
 */
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
    trustedOrigins: ["http://localhost:5173"],
    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            // Campo para los permisos
            permisos: {
                type: "string",
                required: false,
                input: false,
                defaultValue: "{}"
            },
        },
    },
    plugins: [
        /**
         * Documentacion
         */
        openAPI(),

        /**
         * Retorno de los permisos
         */
        customSession(async ({ user, session }) => {
            let permisosParsed: Permisos = {}

            try {
                // Validacion de existencia antes de parsear
                permisosParsed = user && "permisos" in user && user.permisos
                    ? JSON.parse(user.permisos as string)
                    : {};
            } catch (error) {
                permisosParsed = {}
            }

            return {
                user: {
                    ...user,
                    permisos: permisosParsed
                },
                session
            }
        }),
    ],

    /**
     * Vencimiento y refresco de la sesion
     */
    session: {
        expiresIn: 60 * 20,
        updateAge: 60 * 15,
    },

    advanced: {
        disableCSRFCheck: true, // solo para desarrollo
    },
})