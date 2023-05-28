import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth }: any = useAuth();
    const location = useLocation();

    console.log(auth?.payload?.sub)
    console.log(auth?.user)

    return (
        auth?.payload?.sub === 1 ? <Outlet />  
        : auth?.user ? <Navigate to="/unauthorized" state={{ from: location }} replace /> :
        <Navigate to={"/login"} state={{ from: location }} replace /> //replace login in navigation history with location they came from
    );
}

export default RequireAuth
