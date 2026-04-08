import React from 'react'
import { formatDateTime } from '../../helpers/formatDateTime';

type Props = {
    id: number;
    usuario: {
        primer_nombre: string;
        primer_apellido: string;
    } | null;
    nombre: string;
    descripcion: string;
    fecha: Date;
}

export const TarjetaEvento = (props: Props) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-5">

            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <p className="text-2xl font-semibold text-white truncate">
                    {props.nombre}
                </p>
                <span className="text-base text-white/60 shrink-0">
                    {formatDateTime(props.fecha)}
                </span>
            </div>

            {/* Descripción */}
            <p className="text-lg text-white/80 leading-snug line-clamp-3">
                {props.descripcion}
            </p>

        </div>
    )
}
