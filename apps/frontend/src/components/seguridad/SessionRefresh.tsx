import { type PropsWithChildren } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useStoreUsuario } from '../../store/Usuario.store';
import { ActionRefresh } from '../../actions/Refresh/Refresh';

export const SessionRefresh = ({ children }: PropsWithChildren) => {

    const { save, clear } = useStoreUsuario();
    const estado = useStoreUsuario((s) => s.estado);

    useQuery({
        queryKey: ["session-refresh"],
        queryFn:

            // Logica para refrescar la session
            async () => {
                const result = await ActionRefresh();

                if (!result.ok) {
                    clear();
                    window.location.replace("/error/sin-permisos");
                    return true;
                }

                save(result.datos.token, result.datos.permisos);
                return false;
            },
        enabled: estado === "AUTENTICADO",
        retry: false,
        refetchInterval: 1000 * 60 * 15,
        staleTime: 1000 * 60 * 15,
    })

    return children
}