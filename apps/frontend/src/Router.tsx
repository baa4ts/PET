import { createBrowserRouter } from "react-router";
import { Index } from "./pages/Index";
import { lazy, Suspense } from "react";
import { SessionCheck } from "./components/seguridad/SessionCheck";

/**
 *
 * Carga dinamica de las vistas
 *
 */
const Tv = lazy(() => import("./pages/tv/Tv").then(m => ({ default: m.Tv })));
const Login = lazy(() => import("./pages/autenticacion/Login").then(m => ({ default: m.Login })));
const Register = lazy(() => import("./pages/autenticacion/Register").then(m => ({ default: m.Register })));
const Administracion = lazy(() => import("./pages/administracion/Administracion").then(m => ({ default: m.Administracion })));

/**
 *
 * Loading para carga bajo demanda
 *
 */
const S = ({ component: Component }: { component: React.ComponentType }) => (
    <Suspense fallback={<div>Cargando...</div>}>
        <Component />
    </Suspense>
);

export const AppRouter = createBrowserRouter([

    /**
     *
     * Punto de entrada
     *
     */
    {
        index: true,
        element: <Index />
    },
    {
        // Version para tv
        path: "/tv",
        element: <S component={Tv} />
    },

    /**
     *
     * Seccion de autenticacion — sin session
     *
     */
    {
        element: <SessionCheck session={false} />,
        children: [
            { path: "/login", element: <S component={Login} /> },
            { path: "/register", element: <S component={Register} /> }
        ]
    },

    /**
     *
     * Rutas protegidas — requieren session
     *
     */
    {
        element: <SessionCheck />,
        children: [
            { path: "/administracion", element: <S component={Administracion} /> }
        ]
    },

    /**
     *
     * Rutas para errores
     *
     */
    {
        path: "/error",
        children: [
            { path: "sin-permisos", element: <h1>No tienes permisos suficientes</h1> }
        ]
    }
])