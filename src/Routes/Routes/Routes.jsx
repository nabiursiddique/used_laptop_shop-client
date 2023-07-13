import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Home from "../../components/Pages/Home/Home/Home";
import Blog from "../../components/Pages/Blog/Blog/Blog";
import SignUp from "../../components/Pages/SignUp/SignUp";
import SignIn from "../../components/Pages/SignIn/SignIn";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import Dashboard from "../../components/Pages/Dashboard/Dashboard/Dashboard";
import AllUsers from "../../components/Pages/Dashboard/AllUsers/AllUsers";
import MyProducts from "../../components/Pages/Dashboard/MyProducts/MyProducts";
import AddAProduct from "../../components/Pages/Dashboard/AddAProduct/AddAProduct";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/signUp',
                element:<SignUp></SignUp>
            },
            {
                path:'/signIn',
                element:<SignIn></SignIn>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/dashboard/allUsers',
                element:<AllUsers></AllUsers>
            },
            {
                path:'/dashboard/addAProduct',
                element:<AddAProduct></AddAProduct>
            }
        ]
    }
]);

export default router;