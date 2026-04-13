import { createBrowserRouter } from "react-router";

import { requireGuest } from "../loaders/requireGuest";
import { requireSession } from "../loaders/requireSession";
import { Login } from "./autenticacion/Login";
import { Register } from "./autenticacion/Register";
import { Home } from "./home/Home";
import { Tv } from "./tv/Tv";
import { Perfil } from "./usuario/Perfil";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    /**
     * Seccion para la tv
     */
    {
        path: "/tv",
        element: <Tv />
    },
    /**
     * Seccion de autenticacion
     */
    {
        path: "/autenticacion",
        children: [
            {
                path: "login",
                loader: requireGuest,
                element: <Login />,
            },
            {
                path: "register",
                loader: requireGuest,
                element: <Register />
            }
        ]
    },
    /**
     * Seccion de usuario
     */
    {
        path: "/usuario",
        loader: requireSession,
        children: [
            {
                index: true,
                element: <Perfil />
            }
        ]
    }
])

export { AppRouter }