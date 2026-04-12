export interface EventosResponse {
    mensaje: string;
    eventos: Evento[];
}

export interface Evento {
    id:          number;
    nombre:      string;
    descripcion: string;
    fecha:       Date;
    creado:      Date;
}
