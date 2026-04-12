import { adminClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

import { accessControl, AdminRole, ausenciasRole, eventosRole,noticiasRole } from "@/types/Roles"

const Client = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        adminClient({
            ac: accessControl,
            roles: {
                ausencias: ausenciasRole,
                eventos: eventosRole,
                noticias: noticiasRole,
                root: AdminRole,
            }
        }),
    ]
})

export { Client }