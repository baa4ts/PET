import axios from "axios"
import { API } from "../configuracion/API.config"

type Resp =
    | { ok: true, datos: Ausencia[] }
    | { ok: false, datos: null }

export const ActionAusencias = async (): Promise<Resp> => {
    try {
        const response = await API.get<ActionAusenciasResponse>('/v1/ausencias')

        return { ok: true, datos: response.data.ausencias }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { ok: true, datos: [] }
        }

        return { ok: false, datos: null }
    }
}
