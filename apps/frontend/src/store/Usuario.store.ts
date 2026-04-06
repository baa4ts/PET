import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Usuario = {
    token: string | null
    niveles: string | null
}

export type StoreUsuario = {
    usuario: Usuario
    estado: "AUTENTICADO" | "VERIFICANDO" | "DESAUTENTICADO"

    save: (cedula: string, niveles: string) => void
    clear: () => void
}

export const useStoreUsuario = create<StoreUsuario>()(
    persist(
        (set) => ({
            usuario: {
                token: null,
                niveles: null
            },

            estado: "DESAUTENTICADO",

            save: (token, niveles) => set({
                usuario: { token, niveles },
                estado: "AUTENTICADO"
            }),

            clear: () => {

                // borrar el store
                set({
                    usuario: { token: null, niveles: null },
                    estado: "DESAUTENTICADO"
                })

                // Borrar la session persistente
                localStorage.removeItem("session");
            }
        }),
        { name: "session" }
    )
)