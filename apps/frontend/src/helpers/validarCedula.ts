// src/helpers/validarCedula.ts

export const validarCedula = ({ value }: { value: string }) => {
    if (!/^\d+$/.test(value)) return "Solo se permiten numeros";
    if (value.length !== 8) return "La cedula debe tener 8 digitos";
    return undefined;
};