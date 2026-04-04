import { Router } from "express";
import { RouteUsuarios } from "./usuarios/usuarios";
import { RouteTesting } from "./testing/testing";

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
router.use("/testing", RouteTesting);

/**
 *
 * Export
 *
 */
export { router };
