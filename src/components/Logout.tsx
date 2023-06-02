import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {

    const token = localStorage.removeItem('token')
    console.log('Token: ' + token)
    
    return (<> <Navigate to="/login" /> </>)
}

export default Logout
