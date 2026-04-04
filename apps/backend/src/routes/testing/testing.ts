import { Request, Response, Router } from "express";
import { Archivos } from "../../middleware/Archivos";
/**
 * Instancia
 */
const API = Router();

API.post("/",

    /**
     * Chain of Responsibility
     */
    Archivos({
        formatos: ["image/jpeg", "image/png"],
        maxFiles: 5, // 5 Archivos
        maxSizeFile: 5 * 1024 * 1024
    }).array("files", 5),

    (req: Request, res: Response) => {
        const files = req.files as Express.Multer.File[];

        // Validar que se envió al menos un archivo
        if (!files || files.length === 0)
            return res.status(400).json({ error: "No se enviaron archivos" });

        const archivos = files.map(f => f.filename.split(".")[0]);
        return res.json({ Archivos: archivos });
    }
);

/**
 * Exports
 */
export { API as RouteTesting };
