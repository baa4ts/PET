export interface Noticia {
    descripcion: string;
    id: number;
    publicado: Date;
    recursos: Recurso[];
    titulo: string;
}

export interface NoticiasResponse {
    mensaje: string;
    noticias: Noticia[];
}

export interface Recurso {
    es_noticia: boolean;
    fecha: Date;
    id: number;
    noticiaId: number;
    resource: string;
    userId: string;
}
