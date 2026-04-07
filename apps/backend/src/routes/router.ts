import { Router } from "express";
import { RouteUsuarios } from "./v1/usuarios/usuarios";
import { RouteNoticias } from "./v1/noticias/noticias";
import { RouteAusencias } from "./v1/ausencias/ausencias";
import { RouteEventos } from "./v1/eventos/eventos";
import { RouteTv } from "./v2/tv/tv";

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

/**
 * End - point de la version 1
 */
router.use("/v1/usuarios", RouteUsuarios);
router.use("/v1/noticias", RouteNoticias);
router.use("/v1/ausencias", RouteAusencias);
router.use("/v1/eventos", RouteEventos);

/**
 * End - point de la version 2
 */
router.use('/v2/tv', RouteTv)

/**
 *
 * Export
 *
 */
export { router };
