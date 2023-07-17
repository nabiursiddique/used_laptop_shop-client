import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";
import Home from "../../components/Pages/Home/Home/Home";
import Blog from "../../components/Pages/Blog/Blog/Blog";
import SignUp from "../../components/Pages/SignUp/SignUp";
import SignIn from "../../components/Pages/SignIn/SignIn";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import AllUsers from "../../components/Pages/Dashboard/AllUsers/AllUsers";
import MyProducts from "../../components/Pages/Dashboard/MyProducts/MyProducts";
import AddAProduct from "../../components/Pages/Dashboard/AddAProduct/AddAProduct";
import Products from "../../components/Pages/Products/Products/Products";
import Profile from "../../components/Pages/Dashboard/Profile/Profile";
import AllBuyers from "../../components/Pages/Dashboard/AllBuyers/AllBuyers";
import AllSellers from "../../components/Pages/Dashboard/AllSellers/AllSellers";
import MyOrders from "../../components/Pages/Dashboard/MyOrders/MyOrders";

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
            },
            {
                path:'/products',
                element:<Products></Products>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                path:'/dashboard/profile',
                element:<Profile></Profile>
            },
            {
                path:'/dashboard/myProduct',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/dashboard/allUsers',
                element:<AllUsers></AllUsers>
            },
            {
                path:'/dashboard/addAProduct',
                element:<AddAProduct></AddAProduct>
            },
            {
                path:'/dashboard/allBuyers',
                element:<AllBuyers></AllBuyers>
            },
            {
                path:'/dashboard/allSellers',
                element:<AllSellers></AllSellers>
            },
            {
                path:'/dashboard/myOrders',
                element:<MyOrders></MyOrders>
            }
        ]
    }
]);

export default router;