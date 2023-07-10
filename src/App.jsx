import { RouterProvider } from "react-router-dom"
import Navbar from "./components/Shared/Navbar/Navbar"
import router from "./Routes/Routes/Routes"

function App() {

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
