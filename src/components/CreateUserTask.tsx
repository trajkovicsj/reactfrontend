import { useState, useEffect } from 'react'
import "./styles.css"
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../axios';
import { useForm } from 'react-hook-form';

function CreateUserTask() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [taskDescription, setTaskDescription] = useState('')
    const [created_at, setCreated] = useState(new Date());
    const [updated_at, setUpdated] = useState(new Date());
    const [done, isDone] = useState(false)
    const [User_idUser, setIdUser] = useState(localStorage.getItem('user'))
    const [errMsg, setErrMsg] = useState('')
    const { register, handleSubmit } = useForm({});

    useEffect(() => {
        setErrMsg('')
    }, [taskDescription, created_at, updated_at, done, User_idUser])

    const onSubmit = async (data: any) => {
        try {
            const response = await axiosInstance.post('/task/add-task/', JSON.stringify({ taskDescription, created_at, updated_at, done, User_idUser }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            console.log(JSON.stringify(response?.data));
            setCreated(new Date())
            setUpdated(new Date())
            isDone(false)
            setIdUser(localStorage.getItem('user'))
            alert('Successfully')
            navigate('/taskList')
        } catch (error: any) {
            if (!error.response) {
                setErrMsg('No server response')
            }
            if (error) {
                setErrMsg('Error while adding a task')
            }
        }
    }

    return (
        <div className="main">
            <h1 className='heading'>Create Task</h1>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='input'>
                    <label htmlFor='taskDescription'>Task description:</label>
                    <input {...register('taskDesription', { required: true })} placeholder='Description' onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} required /><br /><br />
                </div>
                <input type='submit' />
            </form>
        </div>
    )
}
export default CreateUserTask
