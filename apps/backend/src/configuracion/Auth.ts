import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
// Plugins
import { admin, openAPI } from "better-auth/plugins"

import { prisma } from "./Prisma"
import { accessControl, AdminRole, ausenciasRole, eventosRole, noticiasRole } from "./Roles"

/**
 * Gestor de autenticación
 */
const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "sqlite",
    }),
    trustedOrigins: ["http://localhost:5173"],
    emailAndPassword: {
        enabled: true,
    },
    plugins: [

        /**
         * Control mediante roles
         */
        admin({
            ac: accessControl,
            roles: {
                root: AdminRole,
                noticias: noticiasRole,
                ausencias: ausenciasRole,
                eventos: eventosRole,
            }
        }),


        /**
         * Documentacion
         */
        openAPI(),
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

export { auth }