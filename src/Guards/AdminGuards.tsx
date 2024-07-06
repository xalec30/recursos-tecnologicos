import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

import Navbar from "../Components/Navbar/Navbar";
import PanelAdmin from "../Components/PanelAdmin/PanelAdmin";

export default function AdminGuards(){

    const Auth = useAuth();
    const user = JSON.parse(Auth.user);

    if (!Auth.token){
        return <Navigate to="/account/login" />;
    }
    if(user.role_id != "1"){
        return <Navigate to="/" />;
    }

    return(
        <>
            <Navbar hiddenButtonsAuth={1}/>
            <div className="columns vh-100">
                <PanelAdmin />
                <Outlet/>
            </div>
        </>
    )
}