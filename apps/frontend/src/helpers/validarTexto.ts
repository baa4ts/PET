// src/helpers/validarTexto.ts

export const validarTexto = ({ value }: { value: string }) => {
    if (value.length < 3) return "Minimo 3 caracteres";
    if (/\d/.test(value)) return "No se permiten numeros";
    if (/(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b|\bUNION\b|--|;)/i.test(value))
        return "Texto invalido";
    return undefined;
};