import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

export default function LoginGuards(){

    const Auth = useAuth();

    if (Auth.token){
        return <Navigate to="/dashboard/overview" />;
    }

    return (
        <>
            <Outlet />
        </>
    );
} 