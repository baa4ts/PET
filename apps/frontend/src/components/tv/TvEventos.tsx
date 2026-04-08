import { TarjetaEvento } from './TarjetaEvento'
import { AutoScroll } from './AutoScroll'

import { Angry } from 'lucide-react';
import { ActionEvento } from '../../actions/Tv/ActionEventos';
import { useQuery } from '@tanstack/react-query';

export const TvEventos = () => {

    const { data, isError, isLoading, isSuccess } = useQuery({
        queryKey: ["Eventos-tv"],
        queryFn: ActionEvento,
        refetchInterval: 15000,
        staleTime: 15000,
        refetchIntervalInBackground: true
    })

    return (
        <article className="flex flex-col h-1/2 overflow-hidden">
            <div className="w-full flex items-center justify-center h-10 bg-zinc-700 text-xl font-bold shrink-0 tracking-widest uppercase">
                Eventos
            </div>
            <div className="flex-1 bg-zinc-900 border border-t-0 border-zinc-700">
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
                        {/* Si no hay eventos */}
                        {(data.datos.length === 0) && (
                            <div className='w-full h-full flex items-center justify-center text-white/60'>
                                No hay eventos
                            </div>
                        )}


                        {/* Si hay */}
                        {(data.datos) && (
                            <AutoScroll active={data.datos.length > 5}>
                                {data.datos.map((e, i) => (
                                    <TarjetaEvento
                                        id={e.id}
                                        nombre={e.nombre}
                                        descripcion={e.descripcion}
                                        fecha={e.fecha}
                                        usuario={e.usuario}
                                        key={e.id}
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
