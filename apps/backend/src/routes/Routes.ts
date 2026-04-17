import { Router } from "express";

import { ApiEventos } from "./Eventos/Eventos.route";
import { ApiNoticias } from "./Noticias/Noticias.route";
import { ApiAusencias } from "./Ausencias/Ausencias.route";
import { RouteEstadisticas } from "./Estadisticas/Estadisticas.route";

/**
 *
 * Instancia
 * 
 */
const API = Router();

/**
 * 
 * Cargar rutas
 * 
 */
API.use("/eventos", ApiEventos)
API.use("/noticias", ApiNoticias)
API.use("/ausencias", ApiAusencias)
API.use("/estadisticas", RouteEstadisticas)

/**
 *
 * Export
 * 
 */
export { API as AppRouter }