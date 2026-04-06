import { RouterProvider } from "react-router"
import { AppRouter } from "./Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionRefresh } from "./components/seguridad/SessionRefresh"

/**
 * Instancia TanStack
 */
const queryClient = new QueryClient()

function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>

        {/** Mantener refrescada la session */}
        <SessionRefresh>

          {/* Router de la app */}
          <RouterProvider router={AppRouter} />

        </SessionRefresh>

        {/* DevTools de TanStack Query */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
