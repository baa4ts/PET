import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Usuario = {
    token: string | null
    permisos: string | null
}

export type StoreUsuario = {
    usuario: Usuario
    estado: "AUTENTICADO" | "VERIFICANDO" | "DESAUTENTICADO"

    // Funcion para guardar la session
    save: (usuario: string, permisos: string) => void

    // Funcion para cerrar la session
    clear: () => void
}

export const useStoreUsuario = create<StoreUsuario>()(
    persist(
        (set) => ({
            usuario: { token: null, permisos: null },
            estado: "VERIFICANDO",

            // Funcion para guardar la session
            save: (token, permisos) => set({
                usuario: { token, permisos },
                estado: "AUTENTICADO"
            }),

            // Funcion para cerrar la session
            clear: () => {

                // borrar el store
                set({
                    usuario: { token: null, permisos: null },
                    estado: "DESAUTENTICADO"
                })

                // Borrar la session persistente
                localStorage.removeItem("session");
            }
        }),
        {
            name: "session",
            onRehydrateStorage: () => (state) => {
                // Si no hay session marcar como desautenticado
                if (state && !state.usuario.token) {
                    state.estado = "DESAUTENTICADO";
                }
            }
        }
    )
)