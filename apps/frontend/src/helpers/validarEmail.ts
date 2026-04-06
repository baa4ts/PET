// src/helpers/validarEmail.ts

export const validarEmail = ({ value }: { value: string }) => {
    if (!value.includes("@")) return "Email invalido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email invalido";
    return undefined;
};