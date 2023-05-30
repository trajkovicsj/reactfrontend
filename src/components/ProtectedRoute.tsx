import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLogged(true)
        } else {
            setIsLogged(false)
        }
    }, [])

    return isLogged ? <Outlet /> : <Navigate to="/login"></Navigate>

}
export default ProtectedRoute
