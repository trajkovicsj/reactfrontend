import { useState, useEffect } from 'react'
import "./styles.css"
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../axios';
import { useForm } from 'react-hook-form';
import { data } from 'jquery';

function CreateUser() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [created_at, setCreated] = useState(new Date());
    const [updated_at, setUpdated] = useState(new Date());
    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const { register, handleSubmit } = useForm({});

    useEffect(() => {
        setErrMsg('')
    }, [email, pass, created_at, updated_at, first_name, last_name])

    const onSubmit = async (data: any) => {
        try {
            const response = await axiosInstance.post('/user-controller/register', JSON.stringify({ email: email, password: pass, created_at: created_at, updated_at: updated_at, first_name: first_name, last_name }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            setCreated(new Date())
            setUpdated(new Date())
            console.log(JSON.stringify(response?.data));
            alert('User successfully added!')
            navigate('/createUser')
        } catch (error: any) {
            if (error.response?.status === 400) {
                setErrMsg('User alredy exists')
                alert('User alredy exists')
            }
        }
    }
    return (
        <div className="main">
            <p className="title">Create user</p>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <div className='input'>
                    <label htmlFor='email'>Email:</label>
                    <input {...register('email', { required: true })} placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required /><br /><br />
                </div>
                <div className='input'>
                    <label htmlFor='pass'>Password:</label>
                    <input {...register('password', { required: true })} type='password' placeholder='Password' onChange={(e) => setPass(e.target.value)} value={pass} required /> <br /><br />
                </div>
                <div className='input'>
                    <label htmlFor='first_name'>First name:</label>
                    <input {...register('first_name', { required: true })} type='text' placeholder='First name' onChange={(e) => setFirstname(e.target.value)} value={first_name} required /> <br /><br />
                </div>
                <div className='input'>
                    <label htmlFor='last_name'>Last name:</label>
                    <input {...register('last_name', { required: true })} type='text' placeholder='Last name' onChange={(e) => setLastname(e.target.value)} value={last_name} required /> <br /><br />
                </div>
                <input type='submit' />
            </form >
        </div >
    )
}

export default CreateUser
