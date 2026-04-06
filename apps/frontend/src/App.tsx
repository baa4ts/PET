import { RouterProvider } from "react-router"
import { AppRouter } from "./Router"

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
