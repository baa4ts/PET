import "dotenv/config"

import path from "node:path"

import { apiReference } from "@scalar/express-api-reference"
import { toNodeHandler } from "better-auth/node"
import cors from "cors"
import express from "express"
import morgan from "morgan"

import { auth } from "./configuracion/Auth"
import { Home } from "./Helpers/Home"
import { AppRouter } from "./routes/Routes"

const app = express()

/**
 * CORS
 */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

/**
 * Logger 
 */
morgan.token("ip", (req: express.Request) => req.ip ?? req.socket.remoteAddress ?? "-")

app.use(morgan(
    "[:date[iso]] :method :url :status :res[content-length]b - :response-time ms | ip=:ip"
))

/**
 * Gestor de autenticacion
 */
app.all("/api/auth/*splat", toNodeHandler(auth))

/**
 * Middlewares
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Gestor de documentacion
 */
app.use("/api/docs/openapi.yaml", (req, res) => {
    res.sendFile(path.resolve("./docs/openapi.yaml"));
});

app.use("/api/docs", apiReference({
    url: "/api/docs/openapi.yaml",
}));

/**
 * Servir archivos staticos
 */
app.use("/static", express.static(Home(process.env.STATIC!, true)));

/**
 * Router
 */
app.use("/api", AppRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})