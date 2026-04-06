import axios from "axios"
import { useStoreUsuario } from "../../store/Usuario.store"

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

API.interceptors.request.use(
    (config) => {
        const token = useStoreUsuario.getState().usuario.token;

        if (token) {
            console.log("Se incluyo")
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)
API.interceptors.response.use(
    (response) => response,

    // Handle para controlar desautenticado entre otros
    (error) => {
        if (error.response?.status === 401) {
            // Limpiar la session
            useStoreUsuario.getState().clear()

            // Redireccion
            window.location.replace("/error/sin-permisos")
        }

        if (error.response?.status === 403)
            window.location.replace("/error/sin-permisos")

        return Promise.reject(error)
    }
)