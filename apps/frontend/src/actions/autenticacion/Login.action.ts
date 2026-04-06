import { API } from "../configuracion/API.config";

export interface Props {
    cedula: string;
    password: string;
};

export const ActionLogin = async (body: Props): Promise<ActionResult> => {
    try {
        const response = await API.post<AutenticacionResponse>("/usuarios/login", body);

        if (response.status !== 200) {
            return { ok: false, message: "Credenciales incorrectas" };
        }

        return { ok: true, datos: response.data.usuario };

    } catch (_) {
        return { ok: false, message: "Error de conexión" };
    }
};