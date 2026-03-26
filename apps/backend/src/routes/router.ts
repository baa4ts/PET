import { Router } from "express";
import { RouteUsuarios } from "./usuarios/usuarios";

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
router.use("/usuarios", RouteUsuarios);

/**
 *
 * Export
 *
 */
export { router };
