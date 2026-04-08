import axios from "axios"
import { API } from "../configuracion/API.config"

type Resp =
    | { ok: true, datos: Noticia[] }
    | { ok: false, datos: null }

export const ActionNoticias = async (): Promise<Resp> => {
    try {
        const response = await API.get<ActionNoticiasResponse>('/v1/noticias')

        return { ok: true, datos: response.data.noticias }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { ok: true, datos: [] }
        }

        return { ok: false, datos: null }
    }
}
