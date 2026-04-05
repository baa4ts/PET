import { Router } from "express";
import { RouteUsuarios } from "./usuarios/usuarios";
import { RouteNoticias } from "./noticias/noticias";

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
router.use("/noticias", RouteNoticias);

/**
 *
 * Export
 *
 */
export { router };
