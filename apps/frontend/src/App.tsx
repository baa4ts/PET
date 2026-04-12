import { RouterProvider } from "react-router"

import { AppRouter } from "./App.router"

const App = () => {
  return (
    <RouterProvider router={AppRouter} />
  )
}

export default App