import { API } from "../configuracion/API.config"

export type Result =
    | { ok: true; datos: Usuario }
    | { ok: false; datos: undefined }

export const ActionRefresh = async (): Promise<Result> => {
    try {
        const response = await API.get<AutenticacionResponse>("/v1/usuarios/refresh");
        return { ok: true, datos: response.data.usuario };
    } catch (err: any) {
        return { ok: false, datos: undefined };
    }
};