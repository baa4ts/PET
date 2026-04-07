import express from "express";
import { router } from "./routes/router";
import morgan from "morgan"
import "dotenv/config";
import { homePATH } from "./helpers/homePATH";
import cors from "cors";

/**
 *
 * Instancia
 *
 */
const App = express();

/**
 *
 * Configuraciones
 *
 */

// Json
App.use(express.json());

// Forms
App.use(express.urlencoded({ extended: true }));

// Logger
App.use(morgan("dev"));

// Archivos staticos
App.use("/static", express.static(homePATH(process.env.STATIC!, true)))

// CORS
App.use(cors());


/**
 *
 * Router
 *
 */
App.use("/api", router);

/**
 *
 * Listener
 *
 */
App.listen(process.env.PORT, () => {
  console.log(` Server: http://localhost:${process.env.PORT}`);
});
