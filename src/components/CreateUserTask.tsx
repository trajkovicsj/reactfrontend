import { useState, useEffect } from 'react'
import "./styles.css"
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

function CreateUserTask() {

    const { setAuth }: any = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [taskDescription, setTaskDescription] = useState('')
    const [created_at, setCreated] = useState(new Date());
    const [updated_at, setUpdated] = useState(new Date());
    const [done, isDone] = useState(false)
    const [User_idUser, setIdUser] = useState()
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg('')
    }, [taskDescription, created_at, updated_at, done, User_idUser])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/task/add-task/', JSON.stringify({ taskDescription, created_at: created_at, updated_at: updated_at, done, User_idUser }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            console.log(JSON.stringify(response?.data));
            const access_token = response?.data?.access_token;
            const payload = response?.data?.payload;
            //User_idUser = response?.data?.payload?.sub
            //console.log(User_idUser)
            console.log(payload)
            setAuth({ payload, access_token });
            //console.log(JSON.stringify(reponse))
            //clear
            setTaskDescription('')
            setCreated(new Date())
            setUpdated(new Date())
            isDone(false)
            setIdUser(payload.sub)
            navigate(from, { replace: true });
        } catch (error: any) {
            if (error.response?.status === 400) {
                setErrMsg('Wrong email or password')
            }
        }

    }
    return (
        <div className="main">
            <h1 className='heading'>Create Task</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor='taskDescription'>Task description:</label>
                    <input type='text' id='taskDescription' placeholder='Description' onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} required /><br /><br />
                </div>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default CreateUserTask
