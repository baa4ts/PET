import { Client } from "@/providers/Client.provider"

export const Perfil = () => {
    const { data: session } = Client.useSession()

    return (
        <div>
            <p>{session?.user.name}</p>
            <p>{session?.user.email}</p>
        </div>
    )
}