import { CircleNotch } from "@phosphor-icons/react"
import { lazy, Suspense } from "react"
import { createBrowserRouter, redirect } from "react-router"

import { usuarioAnonimo, usuarioLogueado } from "@/providers/loaders/loaderUsuario"

import { Home } from "./home/Home"

/**
 *
 * Carga bajo demanda las paginas
 *
 */
const Tv = lazy(() => import("./tv/Tv").then((m) => ({ default: m.Tv })))
const Login = lazy(() => import("./autenticacion/Login").then((m) => ({ default: m.Login })))
const Register = lazy(() => import("./autenticacion/Register").then((m) => ({ default: m.Register })))
const Perfil = lazy(() => import("./usuario/Perfil").then((m) => ({ default: m.Perfil })))
const Dashboard = lazy(() => import("./dashboard/Dashboard").then((m) => ({ default: m.Dashboard })))

function Lazy({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<PageSpinner />}>{children}</Suspense>
}

function PageSpinner() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <CircleNotch className="text-primary h-16 w-16 animate-spin" />
        </div>
    )
}

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },

    /**
     * Seccion para la tv
     */
    {
        path: "/tv",
        element: (
            <Lazy>
                <Tv />
            </Lazy>
        ),
    },

    /**
     * Seccion de autenticacion
     */
    {
        path: "/autenticacion",
        loader: usuarioAnonimo,
        children: [
            {
                index: true,
                loader: () => redirect("/autenticacion/login"),
            },
            {
                path: "login",
                element: (
                    <Lazy>
                        <Login />
                    </Lazy>
                ),
            },
            {
                path: "register",
                element: (
                    <Lazy>
                        <Register />
                    </Lazy>
                ),
            },
        ],
    },

    /**
     * Seccion de usuario
     */
    {
        path: "/usuario",
        loader: usuarioLogueado,
        children: [
            {
                index: true,
                element: (
                    <Lazy>
                        <Perfil />
                    </Lazy>
                ),
            },
        ],
    },

    /**
     * Seccion del dashboard
     */
    {
        path: "/dashboard",
        loader: usuarioLogueado,
        element: (
            <Lazy>
                <Dashboard />
            </Lazy>
        ),
        children: [
            {
                index: true,
                element: <h1>No hay nada aun</h1>,
            },

            /**
             * Seccion gestion
             */
            {
                path: "noticias",
                element: <h1>No hay nada en noticias</h1>,
            },
            {
                path: "eventos",
                element: <h1>No hay nada aun en eventos</h1>,
            },
            {
                path: "ausencias",
                element: <h1>No hay nada aun en ausencias</h1>,
            },

            /**
             * Seccion estadistica
             */
            {
                path: "estadisticas-resumen",
                element: <h1>No hay nada aun en estadisticas resumen</h1>,
            },

            /**
             * Seccion de gestion admin
             */
            {
                path: "gestion-usuarios",
                element: <h1>No hay nada aun en gestion de usuarios</h1>,
            },

            /**
             * Error sin permiso
             */
            {
                path: "sin-permisos",
                element: <h1>No tienes suficientes permisos</h1>,
            },
        ],
    },
])

export { AppRouter }
