import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth2 = () => {
    const { auth }: any = useAuth();
    const location = useLocation();

    console.log(auth?.payload?.sub)
    console.log(auth?.user)

    return (
        auth?.user ? <Outlet /> :
            <Navigate to={"/login"} state={{ from: location }} replace /> //replace login in navigation history with location they came from
    );
}

export default RequireAuth2
