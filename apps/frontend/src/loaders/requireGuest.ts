import { redirect } from "react-router"

import { Client } from "@/providers/Client.provider"

export async function requireGuest() {
    const { data } = await Client.getSession()
    if (data) throw redirect("/")
}