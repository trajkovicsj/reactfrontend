
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

const PrivateRoutes = ({ children }: any) => {
    let idUser: number
    let auth = localStorage.getItem('token')
    const id = localStorage.getItem('user')
    if (id != null) {
        idUser = +id;

        if (auth && idUser === 1) {
            return children

        } else {
            return (<Navigate to="/unauthorized" />)
        }
    }

}

export default PrivateRoutes

