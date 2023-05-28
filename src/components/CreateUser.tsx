import React, { useState, useEffect, useRef } from 'react'
import "./styles.css"
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

function CreateUser() {

    const { setAuth }: any = useAuth();
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

    useEffect(() => {
        setErrMsg('')
    }, [email, pass, created_at, updated_at, first_name, last_name])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/user-controller', JSON.stringify({ email: email, password: pass, created_at: created_at, updated_at: updated_at, first_name: first_name, last_name }), {
                headers: {
                    "Content-Type": 'application/json',
                },
            });
            console.log(JSON.stringify(response?.data));
            const access_token = response?.data?.access_token;
            const payload = response?.data?.payload;
            setAuth({ email, pass, payload, access_token });
            //console.log(JSON.stringify(reponse))
            //clear
            setEmail('')
            setPass('')
            setCreated(new Date())
            setUpdated(new Date())
            setFirstname('')
            setLastname('')
            navigate(from, { replace: true });
        } catch (error: any) {
            if (error.response?.status === 400) {
                setErrMsg('Wrong email or password')
            }
        }

    }
    return (
        <div className="main">
            <h1 className='heading'>Create user</h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor='email'>Email:</label>
                    <input type='text' id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required /><br /><br />
                </div>
                <div className='input'>
                    <label htmlFor='pass'>Password:</label>
                    <input type='password' id='pass' placeholder='Password' onChange={(e) => setPass(e.target.value)} value={pass} required /> <br /><br />
                    <div className='input'>
                        <label htmlFor='first_name'>First name:</label>
                        <input type='text' id='first_name' placeholder='First name' onChange={(e) => setFirstname(e.target.value)} value={first_name} required /><br /><br />
                    </div>
                    <div className='input'>
                        <label htmlFor='last_name'>Last name:</label>
                        <input type='text' id='last_name' placeholder='Last name' onChange={(e) => setLastname(e.target.value)} value={last_name} required /><br /><br />
                    </div>
                    <button type='submit'>Add</button></div>
            </form>
        </div>
    )
}

export default CreateUser
