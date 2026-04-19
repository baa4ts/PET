import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

const Client = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [
        inferAdditionalFields({
            user: { permisos: { type: "string", required: false } },
        }),
    ],
})

const cerrarSession = async (onSuccess?: () => void) =>
    await Client.signOut({
        fetchOptions: { onSuccess },
    })

export { cerrarSession, Client }
