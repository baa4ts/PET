// src/helpers/validarTelefono.ts

export const validarTelefono = ({ value }: { value: string }) => {
    const limpio = value.replace(/[\s\-]/g, "");

    if (!/^\d+$/.test(limpio)) return "Solo se permiten numeros";

    // Movil: 09X XXX XXXX (9 digitos, empieza en 09)
    if (/^09\d{7}$/.test(limpio)) return undefined;

    // Fijo Montevideo: 2X XXX XXX (8 digitos, empieza en 2)
    if (/^2\d{7}$/.test(limpio)) return undefined;

    // Fijo interior: 0X XXX XXX (8 digitos, empieza en 03-09)
    if (/^0[3-9]\d{6}$/.test(limpio)) return undefined;

    return "Telefono uruguayo invalido";
};