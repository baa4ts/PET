import { ActionNoticias } from '../../actions/Tv/ActionNoticias'
import { useQuery } from '@tanstack/react-query'
import { StatusOverlay } from './StatusOverlay'

export const TvNoticias = () => {

    // Noticias
    const { data , isError, isLoading } = useQuery({
        queryKey: ["noticias-tv"],
        queryFn: ActionNoticias,
        refetchInterval: 15000,
        staleTime: 15000,
        refetchIntervalInBackground: true
    })
    return (
        <main className="flex-1 h-full flex flex-col p-8 gap-4">
            <div className="w-full flex items-center justify-center h-10 bg-zinc-700 text-xl font-bold shrink-0 tracking-widest uppercase">
                Noticias
            </div>
            <div className="flex-1 bg-zinc-900 border p-2 border-t-0 border-zinc-700">
                {/* Si las noticias estan cargando */}
                {(isLoading || isError) && (
                    <StatusOverlay isLoading={isLoading} isError={isError} />
                )}
            </div>
        </main>
    )
}
