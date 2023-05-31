import React, { useState, useEffect, useRef } from 'react'
import "./styles.css"
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

function LoginForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg('')
    }, [user, pass,])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', JSON.stringify({ email: user, password: pass }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            })
            console.log(JSON.stringify(response?.data));
            let access_token = response?.data?.access_token;
            console.log(access_token)
            const payload = response?.data?.payload;
            console.log(payload)
            localStorage.setItem('token', access_token)
            localStorage.setItem('user', payload.sub)
            console.log("Tokennnn:  " + localStorage.getItem('token'))
            console.log("User id" + localStorage.getItem('user'))
            setUser('')
            setPass('')
            navigate('/createUserTask');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No server response')
            } else if (err.response?.status === 400) {
                setErrMsg('Unauthorized')
            }
        }
    }

    return (
        <div className="main">
            <h1 className='heading'>Login</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' placeholder='Email' onChange={(e) => setUser(e.target.value)} value={user} required /><br /><br />
                </div>
                <div className='input'>
                    <label htmlFor='pass'>Password:</label>
                    <input type='password' id='pass' placeholder='Password' onChange={(e) => setPass(e.target.value)} value={pass} required /> <br /><br />
                    <button type='submit'>Login</button></div>
            </form>
        </div>
    )
}

export default LoginForm
