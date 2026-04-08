type ActionNoticiasResponse = {
    message: string;
    noticias: Noticia[];
}

type Noticia = {
    id: number;
    titulo: string;
    descripcion: string;
    recursos: Recurso[];
}

type Recurso = {
    resource: string;
}

type ActionAusenciasResponse = {
    message: string;
    ausencias: Ausencia[];
}

type Ausencia = {
    materia: string;
    usuario: Usuario;
    creado: Date;
}

type Usuario = {
    primer_nombre: string;
    primer_apellido: string;
}



type ActionEventosResponse = {
    message: string;
    eventos: Evento[];
}

type Evento = {
    id: number;
    nombre: string;
    descripcion: string;
    fecha: Date;
    usuario: Usuario;
}

type Usuario = {
    primer_nombre: string;
    primer_apellido: string;
}
