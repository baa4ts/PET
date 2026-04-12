export const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    const opciones: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return date.toLocaleDateString("es-ES", opciones);
};