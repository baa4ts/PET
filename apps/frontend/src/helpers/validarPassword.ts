// src/helpers/validarPassword.ts

export const validarPassword = ({ value }: { value: string }) => {
    if (value.length < 8) return "La password debe tener al menos 8 caracteres";
    return undefined;
};