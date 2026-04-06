import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Usuario = {
    cedula: string | null
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
                cedula: null,
                niveles: null
            },

            estado: "DESAUTENTICADO",

            save: (cedula, niveles) => set({
                usuario: { cedula, niveles },
                estado: "AUTENTICADO"
            }),

            clear: () => set({
                usuario: { cedula: null, niveles: null },
                estado: "DESAUTENTICADO"
            })
        }),
        { name: "session" }
    )
)