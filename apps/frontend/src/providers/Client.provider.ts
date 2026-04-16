import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

const Client = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        inferAdditionalFields({
            user: {
                permisos: {
                    type: "string"
                }
            }
        })
    ]
})

export { Client }