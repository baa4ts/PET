import { RouterProvider } from "react-router"

import { AppRouter } from "./pages/App.router"
import { TanStack } from "./providers/TanStack"

const App = () => {
    return (
        <TanStack>
            <RouterProvider router={AppRouter} />
        </TanStack>
    )
}

export default App
