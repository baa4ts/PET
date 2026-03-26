import { Router } from "express";
import { RouteEstudiantes } from "./estudiantes/estudiantes";
import { RouteAdministrativos } from "./administrativos/administrativo";

/**
 *
 * Instancia
 *
 */
const router = Router();

/**
 *
 * Rutas cargadas
 *
 */
router.use("/estudiantes", RouteEstudiantes);
router.use("/administrativos", RouteAdministrativos);

/**
 *
 * Export
 *
 */
export { router };
