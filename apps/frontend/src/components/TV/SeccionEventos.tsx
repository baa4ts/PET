import { WifiSlash, XIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

import { getEventos } from "@/actions/Eventos.action"
import { formatearFecha } from "@/helpers/formatearFecha"

export const SeccionEventos = () => {
    const [actual, setActual] = useState(0)
    const [visible, setVisible] = useState(true)
    const [restante, setRestante] = useState(8)

    // Query
    const { data: eventos = [], isError } = useQuery({
        queryKey: ["eventos-tv"],
        queryFn: getEventos,
        refetchInterval: 10_000,
        staleTime: 10_000,
    })

    // Avanza al siguiente evento con fade
    const avanzar = useCallback(() => {
        setVisible(false)
        setTimeout(() => {
            setActual((prev) => (prev + 1) % eventos.length)
            setRestante(8)
            setVisible(true)
        }, 400)
    }, [eventos.length])

    // Intervalo de rotacion y countdown
    useEffect(() => {
        if (eventos.length === 0) return

        const interval = setInterval(avanzar, 8000)

        const countdown = setInterval(() => {
            setRestante((prev) => (prev <= 1 ? 8 : prev - 1))
        }, 1000)

        return () => {
            clearInterval(interval)
            clearInterval(countdown)
        }
    }, [avanzar, eventos.length])

    return (
        <article className="relative flex flex-1 flex-col overflow-hidden rounded-sm bg-white shadow-sm">
            <div className="shrink-0 border-b border-gray-200 px-3 py-2 text-lg font-semibold">Proximo evento</div>

            {/* Si hay error se muestra */}
            {isError && (
                <div className="flex flex-1 items-center justify-center gap-2">
                    <WifiSlash className="text-red-400" size={18} />
                    <p className="text-sm text-red-400">Error al cargar eventos</p>
                </div>
            )}

            {/* Si no hay eventos */}
            {!isError && eventos.length === 0 && (
                <div className="flex flex-1 flex-col items-center justify-center">
                    <XIcon size={32} />
                    <p className="text-sm text-gray-800">No hay eventos</p>
                </div>
            )}

            {/* Si hay eventos */}
            {!isError && eventos[actual] && (
                <div
                    className="flex flex-1 flex-col justify-between p-3 transition-opacity duration-400"
                    style={{ opacity: visible ? 1 : 0 }}
                >
                    <div>
                        <p className="text-xl font-bold text-gray-800">{eventos[actual].nombre}</p>
                        <p className="mt-1 text-sm text-gray-500">{eventos[actual].descripcion}</p>
                    </div>
                    <p className="text-xs font-medium tracking-wide text-blue-500 uppercase">
                        {formatearFecha(eventos[actual].fecha.toString())}
                    </p>
                </div>
            )}

            {/* Countdown */}
            {!isError && eventos.length > 0 && <span className="absolute top-2 right-3 font-mono text-xs text-gray-800">{restante}s</span>}
        </article>
    )
}
