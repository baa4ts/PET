import { Router } from "express";
import { RouteUsuarios } from "./usuarios/usuarios";
import { RouteNoticias } from "./noticias/noticias";
import { RouteAusencias } from "./ausencias/ausencias";
import { RouteEventos } from "./eventos/eventos";

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
router.use("/ausencias", RouteAusencias);
router.use("/eventos", RouteEventos);

/**
 *
 * Export
 *
 */
export { router };
