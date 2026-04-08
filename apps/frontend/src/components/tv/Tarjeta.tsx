import { formatDateTime } from '../../helpers/formatDateTime'

export interface Props {
    materia: string;
    creado: Date,
    usuario: {
        primer_nombre: string;
        primer_apellido: string;
    };
}

export const Tarjeta = (props: Props) => {
    return (
        <div className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-6 py-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xl font-medium text-blue-300">
                {(props.usuario.primer_nombre[0] + props.usuario.primer_apellido[0]).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-2xl font-medium text-white">
                    {props.usuario.primer_nombre} {props.usuario.primer_apellido}
                </p>
                <div className="mt-1 flex items-center gap-3 text-base text-white/60">
                    <span>Matemáticas</span>
                    <span className="text-white/30">·</span>
                    <span>{formatDateTime(props.creado)}</span>
                </div>
            </div>
        </div>
    )
}
