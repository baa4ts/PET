export interface AusenciasResponse {
    mensaje:   string;
    ausencias: Ausencia[];
}

export interface Ausencia {
    creado:  Date;
    materia: string;
    id:      number;
    docente: Docente;
}

export interface Docente {
    name: string;
}
