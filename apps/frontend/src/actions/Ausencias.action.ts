import type { Ausencia, AusenciasResponse } from "@/types/AusenciasResponse"

import { API } from "../providers/API.config"

export const getAusencias = async (): Promise<Ausencia[]> => {
    const { data } = await API.get<AusenciasResponse>("/ausencias")
    return data.ausencias
}
