import React from 'react'
import { Tarjeta } from './Tarjeta'
import { AutoScroll } from './AutoScroll'
import { useQuery } from '@tanstack/react-query'
import { ActionAusencias } from '../../actions/Tv/ActionAusencias'
import { Angry } from 'lucide-react'

export const TvAusencias = () => {

    const { data, isError, isLoading, isSuccess } = useQuery({
        queryKey: ["Ausencia-tv"],
        queryFn: ActionAusencias,
     refetchInterval: 15000,
        staleTime: 15000
    })


    return (
        <article className="flex flex-col h-1/2">
            <div className="w-full flex items-center justify-center h-10 bg-zinc-700 text-xl font-bold shrink-0 tracking-widest uppercase">
                Ausencias
            </div>
            <div className="flex-1 bg-zinc-900 border border-t-0 border-zinc-700 overflow-hidden">
                {isLoading && (
                    <div className='w-full h-full bg-zinc-700 animate-bounce' />
                )}

                {isError && (
                    <div className='w-full h-full bg-zinc-700 flex flex-col items-center justify-center'>
                        <Angry size={46} />
                        <p>Error al cargar</p>
                    </div>
                )}

                {(isSuccess && data.datos != null) && (
                    <>
                        {/* Si no hay Ausencias */}
                        {(data.datos.length === 0) && (
                            <div className='w-full h-full flex items-center justify-center text-white/60'>
                                No hay eventos
                            </div>
                        )}


                        {/* Si hay */}
                        {(data.datos) && (
                            <AutoScroll active={data.datos.length > 5}>
                                {data.datos.map((e, i) => (
                                    <Tarjeta
                                        key={i + (i * 10)}
                                        creado={e.creado}
                                        materia={e.materia}
                                        usuario={e.usuario}
                                    />
                                ))}

                            </AutoScroll>
                        )}
                    </>
                )}
            </div>
        </article>
    )
}
