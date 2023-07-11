import { RouterProvider } from "react-router-dom"
import Navbar from "./components/Shared/Navbar/Navbar"
import router from "./Routes/Routes/Routes"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  )
}

export default App
