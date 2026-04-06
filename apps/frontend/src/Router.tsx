import { createBrowserRouter } from "react-router";
import { Index } from "./pages/Index";
import { lazy, Suspense } from "react";

const Tv = lazy(() => import("./pages/tv/Tv").then(m => ({ default: m.Tv })));
const Login = lazy(() => import("./pages/autenticacion/Login").then(m => ({ default: m.Login })));
const Register = lazy(() => import("./pages/autenticacion/Register").then(m => ({ default: m.Register })));

export const AppRouter = createBrowserRouter([

    /**
     * 
     * Seccion de entrada
     * 
     */
    {
        // Punto de entrada
        index: true,
        element: <Index />
    },
    {
        // Version para tv
        path: "/tv",
        element:
            ( // Carga por demanda
                <Suspense fallback={<div>Cargando...</div>}>
                    <Tv />
                </Suspense>
            )
    },
    /**
     * 
     * Seccion para autenticacion
     * 
     */
    {
        path: "/login",
        element:
            ( // Carga por demanda
                <Suspense fallback={<div>Cargando...</div>}>
                    <Login />
                </Suspense>
            )
    },
    {
        path: "/register",
        element:
            ( // Carga por demanda
                <Suspense fallback={<div>Cargando...</div>}>
                    <Register />
                </Suspense>
            )
    }
])