import { WifiSlash, XIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"

import { getNoticias } from "@/actions/Noticias.action"
import { formatearFecha } from "@/helpers/formatearFecha"

export const SeccionNoticias = () => {
    const [actual, setActual] = useState(0)
    const [restante, setRestante] = useState(5)
    const [visible, setVisible] = useState(true)

    // Query
    const { data: noticias = [], isError } = useQuery({
        queryKey: ["noticias-tv"],
        queryFn: getNoticias,
        refetchInterval: 10_000,
        staleTime: 10_000,
    })

    // Avanza a la siguiente noticia con fade
    const avanzar = useCallback(() => {
        setVisible(false)
        setTimeout(() => {
            setActual((prev) => (prev + 1) % noticias.length)
            setRestante(5)
            setVisible(true)
        }, 400)
    }, [noticias.length])

    // Intervalo de rotacion y countdown
    useEffect(() => {
        if (noticias.length === 0) return

        const interval = setInterval(avanzar, 5000)

        const countdown = setInterval(() => {
            setRestante((prev) => (prev <= 1 ? 5 : prev - 1))
        }, 1000)

        return () => {
            clearInterval(interval)
            clearInterval(countdown)
        }
    }, [avanzar, noticias.length])

    return (
        <article className="min-h-0 flex-4 p-4">
            {/* Si hay error se muestra */}
            {isError && (
                <div className="flex h-full w-full items-center justify-center gap-2 rounded bg-zinc-900">
                    <WifiSlash className="text-red-400" size={18} />
                    <p className="text-sm text-red-400">Error al cargar noticias</p>
                </div>
            )}

            {/* Si no hay noticias */}
            {!isError && noticias.length === 0 && (
                <div className="flex h-full w-full flex-col items-center justify-center rounded bg-zinc-900">
                    <XIcon className="text-zinc-500" size={32} />
                    <p className="text-sm text-zinc-500">No hay noticias</p>
                </div>
            )}

            {/* Si hay noticias */}
            {!isError && noticias[actual] && (
                <div className="relative h-full w-full overflow-hidden rounded bg-zinc-900">
                    <img
                        alt=""
                        className="h-full w-full object-contain"
                        src={"http://localhost:3000/static/" + noticias[actual].recursos[0].resource}
                        style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
                    />
                    <span
                        className="absolute right-4 bottom-4 left-4 z-50 flex flex-col gap-1 rounded bg-black/60 p-3 backdrop-blur-sm"
                        style={{ opacity: visible ? 1 : 0, transition: "opacity 400ms" }}
                    >
                        <div className="flex flex-row items-baseline gap-4">
                            <h1 className="flex-1/2 text-2xl font-bold text-white">{noticias[actual].titulo}</h1>
                            <p className="flex flex-1/2 items-center justify-end pr-5 text-sm text-zinc-300">
                                {formatearFecha(noticias[actual].publicado.toString())}
                            </p>
                        </div>
                        <p className="text-sm text-zinc-300">{noticias[actual].descripcion}</p>
                    </span>

                    <span className="absolute top-4 right-4 rounded bg-black/60 px-3 py-1 font-mono text-sm text-white backdrop-blur-sm">
                        {restante}s
                    </span>
                </div>
            )}
        </article>
    )
}
