import { createBrowserRouter } from "react-router-dom";

import AdminGuards from "../Guards/AdminGuards";
import LoginGuards from "../Guards/LoginGuards";
import ProfileGuards from "../Guards/ProfileGuards";

//pages
import Dashboard from "../Pages/Dashboard/Dashboard";
import Categories from "../Pages/Categories/Categories";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import LostPassword from "../Pages/LostPassword/LostPassword";
import Admin from "../Pages/Admin/Admin";
import Profile from "../Pages/Profile/Profile";
import Users from "../Pages/Users/Users";
import CategoriesList from "../Pages/CategoriesList/CategoriesList";
import Tags from "../Pages/Tags/Tags";
import Roles from "../Pages/Roles/Roles";
import Resource from "../Pages/Resources/Resource";
import NotFound from "../Pages/NotFound/NotFound";
import Overview from "../Pages/Overview/Overview";
import Favorites from "../Pages/Favorites/Favorites";
import Search from "../Pages/Search/Search";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Dashboard/>,
        children: [
            {
                path: '',
                element: <Overview/>
            },  
            {
                path: 'category/:name',
                element: <Categories/>
            }
        ]
    },
    {
        path: '/about',
        element: <About/>
    },
    {
        path: '/search/:search',
        element: <Search/>
    },
    {
        path:'/account/',
        element: <LoginGuards/>,
        children: [
            {
                path:'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path:'lostpassword',
                element: <LostPassword/>
            },
        ]
    },
    {
        path:'/user/',
        element: <ProfileGuards/>,
        children: [
            {
                path:'profile',
                element: <Profile/>
            },
            {
                path:'favorites',
                element: <Favorites/>
            }
        ]
    },
    {
        path: '/dashboard/',
        element: <AdminGuards/>,
        children: [
            {
                path:'overview',
                element: <Admin/>
            },
            {
                path: 'users',
                element: <Users/>
            },
            {
                path: 'categories',
                element: <CategoriesList/>
            },
            {
                path: 'tags',
                element: <Tags/>
            },
            {
                path: 'roles',
                element: <Roles/>
            },
            {
                path: 'resources',
                element: <Resource/>
            },
            {
                path: '*',
                element: <NotFound/>  
            },
        ]
    }
]);

export default router;