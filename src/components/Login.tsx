import { useEffect, useState } from 'react'
import "./styles.css"
import axiosInstance from '../axios';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const { register, handleSubmit } = useForm({});

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const onSubmit = async (data: any) => {
        try {
            const response = await axiosInstance.post('auth/login', JSON.stringify({ email: user, password: pass }), {
                headers: {
                    "Content-Type": 'application/json'
                },
            })
            let access_token = response?.data?.access_token;
            let payload = response?.data?.payload
            localStorage.setItem('token', access_token)
            console.log(access_token)
            console.log(payload)
            localStorage.setItem('user', payload.sub)
            navigate('/createUserTask');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No server response')
            }
            if(err?.response?.status === 400) {
                alert("Invalid credentials")
            }
        }
    }

    return (
        <div className="main">
            <p className="title">Login Form</p>
            <form className="Login" onSubmit={handleSubmit(onSubmit)}>
                <div className='input'>
                    <label htmlFor='email'>Email:</label>
                    <input {...register('email', { required: true })} placeholder='Email' onChange={(e) => setUser(e.target.value)} value={user} required /><br /><br />
                </div>
                <div className='input'>
                    <label htmlFor='pass'>Password:</label>
                    <input {...register('password', { required: true })} type='password' placeholder='Password' onChange={(e) => setPass(e.target.value)} value={pass} required /> <br /><br />
                    <input type='submit' />
                </div>
            </form>
        </div>
    )
}

export default Login
