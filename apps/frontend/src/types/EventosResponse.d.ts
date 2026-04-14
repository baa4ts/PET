export interface Evento {
    creado:      Date;
    descripcion: string;
    fecha:       Date;
    id:          number;
    nombre:      string;
}

export interface EventosResponse {
    eventos: Evento[];
    mensaje: string;
}
