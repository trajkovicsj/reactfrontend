import React, { useState, useEffect, useRef } from 'react'
import "./styles.css"
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import CreateUserTask from './CreateUserTask'

function LoginForm() {

    const { setAuth }: any = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', JSON.stringify({ email: user, password: pass }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            console.log(JSON.stringify(response?.data));
            const access_token = response?.data?.access_token;
            const payload = response?.data?.payload;
            setAuth({user, pass, payload, access_token});
            //console.log(JSON.stringify(reponse))
            //clear
            setUser('')
            setPass('')
            navigate(from, {replace: true});
        } catch (error:any) {
            if(error.response?.status === 400) {
                setErrMsg('Wrong email or password')
            }
        }

    }
    return (
                <div className="main">
                    <h1 className='heading'>Login</h1>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='input'>
                        <label htmlFor='email'>Email:</label>
                        <input type='text' id='email' placeholder='Email' onChange={(e) => setUser(e.target.value)} value={user} required /><br/><br/>
                        </div>
                        <div className='input'>
                        <label htmlFor='pass'>Password:</label>
                        <input type='password' id='pass' placeholder='Password' onChange={(e) => setPass(e.target.value)} value={pass} required /> <br/><br/>
                        <button type='submit'>Login</button></div>
                    </form>
                </div>
            )
}

export default LoginForm
