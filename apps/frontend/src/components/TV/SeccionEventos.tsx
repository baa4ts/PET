import { useEffect, useState } from 'react'

import { getEventos } from '@/actions/Eventos.action'
import { formatearFecha } from '@/helpers/formatearFecha'
import { useQuery } from '@tanstack/react-query'

export const SeccionEventos = () => {
    const { data: eventos = [] } = useQuery({
        queryKey: ['eventos-tv'],
        queryFn: getEventos,
        refetchInterval: 10_000,
        staleTime: 10_000,
    });

    const [actual, setActual] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (eventos.length === 0) return;

        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setActual(prev => (prev + 1) % eventos.length);
                setVisible(true);
            }, 400);
        }, 8000);

        return () => clearInterval(interval);
    }, [eventos.length]);

    const evento = eventos[actual];

    return (
        <article className="flex-1 bg-white rounded-sm shadow-sm flex flex-col overflow-hidden">
            <div className="font-semibold text-lg py-2 px-3 border-b border-gray-200 shrink-0">
                Proximo evento
            </div>

            {evento && (
                <div
                    className="flex flex-col justify-between flex-1 p-3 transition-opacity duration-400"
                    style={{ opacity: visible ? 1 : 0 }}
                >
                    <div>
                        <p className="text-xl font-bold text-gray-800">{evento.nombre}</p>
                        <p className="text-sm text-gray-500 mt-1">{evento.descripcion}</p>
                    </div>
                    <p className="text-xs font-medium text-blue-500 uppercase tracking-wide">
                        {formatearFecha(evento.fecha.toString())}
                    </p>
                </div>
            )}
        </article>
    );
};