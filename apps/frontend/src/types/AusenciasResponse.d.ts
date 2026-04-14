export interface Ausencia {
    creado:  Date;
    docente: Docente;
    id:      number;
    materia: string;
}

export interface AusenciasResponse {
    ausencias: Ausencia[];
    mensaje:   string;
}

export interface Docente {
    name: string;
}
