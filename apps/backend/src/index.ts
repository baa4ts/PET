import express from "express";
import { router } from "./routes/router";
import morgan from "morgan"
import "dotenv/config";

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
App.use(morgan("combined"));

/**
 *
 * Router
 *
 */
App.use("/", router);

/**
 *
 * Listener
 *
 */
App.listen(process.env.PORT, () => {
  console.log(` Server: http://localhost:${process.env.PORT}`);
});
