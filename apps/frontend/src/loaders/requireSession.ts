import { redirect } from "react-router"

import { Client } from "@/providers/Client.provider"

export async function requireSession() {
    const { data } = await Client.getSession()
    if (!data) throw redirect("/autenticacion/login")
    return data
}