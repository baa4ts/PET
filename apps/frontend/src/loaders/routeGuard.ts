import { redirect } from "react-router"

import { Client } from "@/providers/Client.provider"

export async function redirectBySession(ifAuth: string, ifGuest: string) {
    const { data } = await Client.getSession()
    throw redirect(data ? ifAuth : ifGuest)
}