type Eventos = {
    nombre: string;
    descripcion: string;
    fecha: Date;
    id: number;
    usuario: {
        primer_nombre: string;
        primer_apellido: string;
    } | null;
}[];

type Noticias = {
    id: number;
    titulo: string;
    descripcion: string;
    recursos: {
        resource: string;
    }[];
}[];

type Ausencias = {
    materia: string;
    usuario: {
        primer_nombre: string;
        primer_apellido: string;
    };
}[];