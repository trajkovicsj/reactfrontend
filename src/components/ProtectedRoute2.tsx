
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const PrivateRoutes = ({ children }: any) => {
    let auth = localStorage.getItem('token')
    if (auth) {
        return children

    } else {
        return (<Navigate to="/login" />)
    }

}

export default PrivateRoutes
