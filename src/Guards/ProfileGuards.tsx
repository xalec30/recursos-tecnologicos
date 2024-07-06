import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

import Navbar from "../Components/Navbar/Navbar";

export default function ProfileGuards(){

    const Auth = useAuth();

    if (!Auth.token){
        return <Navigate to="/account/login" />;
    }

    return(
        <>
            <Navbar hiddenButtonsAuth={1}/>
            <Outlet/>
        </>
    )
}