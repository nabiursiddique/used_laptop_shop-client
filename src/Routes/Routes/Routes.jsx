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
import MyBuyers from "../../components/Pages/Dashboard/MyBuyers/MyBuyers";
import ErrorPage from "../../components/Shared/ErrorPage/ErrorPage";
import Payment from "../../components/Pages/Dashboard/Payment/Payment";
import AdminRoute from "../AdminRoute/AdminRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        errorElement:<ErrorPage></ErrorPage>,
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
        errorElement:<ErrorPage></ErrorPage>,
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
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'/dashboard/addAProduct',
                element:<AddAProduct></AddAProduct>
            },
            {
                path:'/dashboard/allBuyers',
                element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path:'/dashboard/allSellers',
                element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path:'/dashboard/myOrders',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/myBuyers',
                element:<MyBuyers></MyBuyers>
            },
            {
                path:'/dashboard/payment/:id',
                element:<Payment></Payment>,
                loader: async({params})=> {
                   return fetch(`https://used-laptop-shop-server.vercel.app/booking/${params.id}`)
                }
            }
        ]
    }
]);

export default router;