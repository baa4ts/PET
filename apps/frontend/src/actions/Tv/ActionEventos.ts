import axios from "axios"
import { API } from "../configuracion/API.config"

type Resp =
    | { ok: true, datos: Evento[] }
    | { ok: false, datos: null }

export const ActionEvento = async (): Promise<Resp> => {
    try {
        const response = await API.get<ActionEventosResponse>('/v1/eventos')

        return { ok: true, datos: response.data.eventos }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { ok: true, datos: [] }
        }

        return { ok: false, datos: null }
    }
}
