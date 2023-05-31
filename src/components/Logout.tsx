import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();
    const token = localStorage.removeItem('token')
    console.log('Token: ' + token)
    navigate('/');
    return <>  </>
}

export default Logout
