import { RouterProvider } from "react-router-dom"
import Navbar from "./components/Shared/Navbar/Navbar"
import router from "./Routes/Routes/Routes"
import { Toaster } from "react-hot-toast"
import { register } from 'swiper/element/bundle';

function App() {
  register()
  return (
    <div className="font-body">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  )
}

export default App
