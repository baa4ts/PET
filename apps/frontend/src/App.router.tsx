import { createBrowserRouter } from "react-router";

import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { Index } from "./pages/Index";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Index />
    },

    /** Seccion de usuario */
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ],
    }
])

export { AppRouter }