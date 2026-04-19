import { WifiSlash, XIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"

import { getAusencias } from "@/actions/Ausencias.action"
import { formatearFecha } from "@/helpers/formatearFecha"
import { cn } from "@/lib/utils"

export const SeccionAusencias = () => {
    // Query
    const { data: ausencias = [], isError } = useQuery({
        queryKey: ["ausencias-tv"],
        queryFn: getAusencias,
        refetchInterval: 10_000,
        staleTime: 10_000,
    })

    const activo = ausencias.length > 2

    return (
        <article className="flex flex-1 flex-col overflow-hidden rounded bg-white shadow-sm">
            <div className="border-b border-gray-200 px-3 py-2 text-lg font-semibold">Ausencias</div>

            <div className="relative h-full overflow-hidden">
                {/* Si hay error se muestra */}
                {isError && (
                    <div className="flex h-full w-full items-center justify-center gap-2">
                        <WifiSlash className="text-red-400" size={18} />
                        <p className="text-sm text-red-400">Error al cargar ausencias</p>
                    </div>
                )}

                {/* Si no hay ausencias */}
                {!isError && ausencias.length === 0 && (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                        <XIcon size={32} />
                        <p className="text-sm text-gray-800">No hay ausencias</p>
                    </div>
                )}

                {/* Si hay ausencias */}
                {!isError && ausencias.length > 0 && (
                    <div className={cn("flex flex-col gap-2 p-2", activo && "animate-scroll")}>
                        {(activo ? [...ausencias, ...ausencias] : ausencias).map((item, i) => (
                            <div
                                className="flex h-24 shrink-0 flex-col justify-center rounded-sm bg-blue-400 px-3 shadow-sm transition hover:shadow-md"
                                key={`${item.id}-${i}`}
                            >
                                <p className="text-lg leading-tight font-bold text-white">{item.docente.name}</p>
                                <p className="text-sm font-medium text-blue-50">{item.materia}</p>
                                <p className="mt-1 text-xs text-white">{formatearFecha(item.creado.toString())}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </article>
    )
}
