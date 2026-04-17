import { Session } from "better-auth"
import { Permisos } from "@/configuracion/Auth"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                name: string
                email: string
                emailVerified: boolean
                image?: string | null
                createdAt: Date
                updatedAt: Date
                permisos: Permisos
            }
            session?: Session
        }
    }
}