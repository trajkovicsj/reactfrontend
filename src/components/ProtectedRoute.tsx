import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = (props: any) => {

    const token = localStorage.getItem('token')
    if (token) {
        <Outlet />
        return true
    } else {
        <Navigate to="/login" />
        return false
    }
}


export default ProtectedRoute;