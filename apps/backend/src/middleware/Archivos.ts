import { Request } from "express";
import multer from "multer";
import path from "path";
import { homePATH } from "../helpers/homePATH";

export interface InterfaceArchivos {
    formatos: string[],
    maxFiles: number,
    maxSizeFile: number
}

export const Archivos = ({ formatos, maxFiles, maxSizeFile }: InterfaceArchivos) => multer({
    storage: multer.diskStorage({

        // Destino donde se guardan los archivos
        destination: (req: Request, file, cb) => {
            cb(null, homePATH(process.env.STATIC!, true));
        },

        // Renombrar los archivos con formato: dia-mes-anio_hora-min-seg-mili-(4-random char).ext
        filename: (req: Request, file, cb) => {
            const T = new Date();
            const nombre = `${T.getDate()}-${T.getMonth() + 1}-${T.getFullYear()}_${T.getHours()}-${T.getMinutes()}-${T.getSeconds()}-${T.getMilliseconds()}-${Math.random().toString(36).slice(2, 6)}`;
            cb(null, nombre + path.extname(file.originalname));
        }
    }),

    // Limites tamanio, y cantidad maxima
    limits: { fileSize: maxSizeFile, files: maxFiles },

    // Filtro de formatos permitidos
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, formatos.includes(ext));
    }
});