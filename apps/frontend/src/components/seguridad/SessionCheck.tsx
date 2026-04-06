import { Navigate, Outlet } from 'react-router'
import { useStoreUsuario } from '../../store/Usuario.store'

type Props = {
    session?: boolean
    niveles?: number[]
}

export const SessionCheck = ({ session = true, niveles }: Props) => {
    const { estado, usuario } = useStoreUsuario()

    const autenticado = estado === "AUTENTICADO"

    // si requiere session y no esta autenticado
    if (session && estado === "VERIFICANDO") return <div>Cargando...</div>
    if (session && !autenticado) return <Navigate to="/login" replace />

    // si no requiere session pero ya esta autenticado
    if (!session && autenticado) return <Navigate to="/" replace />

    // verificar niveles
    if (niveles && niveles.length > 0) {
        const nivelesUsuario = usuario.niveles?.split(",").map(Number) ?? []
        const tienePermiso = niveles.some((n) => nivelesUsuario.includes(n))
        if (!tienePermiso) return <Navigate to="/error/sin-permisos" replace />
    }

    return <Outlet />
}