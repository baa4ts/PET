import { API } from "../configuracion/API.config";

export interface Props {
    cedula: string,
    primer_nombre: string,
    primer_apellido: string,
    email: string,
    telefono: string,
    password: string
}

export const ActionRegister = async (body: Props): Promise<ActionResult> => {
    try {
        const response = await API.post<AutenticacionResponse>("/usuarios/register", body);

        if (response.status === 201)
            return { ok: true, datos: response.data.usuario };

        return { ok: false, message: "Error desconocido" }
    } catch (err: any) {
        if (err.response?.status === 409)
            return { ok: false, message: err.response.data.message };
        return { ok: false, message: "Error de conexión" };
    }
};