import { TextField, Button, Stack, FormLabel, Grid, Paper, Avatar } from '@mui/material'
import { useForm } from 'react-hook-form'
import axiosInstance from '../axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FaceIcon from '@mui/icons-material/Face';

type FormValues = {
    email: string,
    password: string
}

export const MuiLoginForm = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { register, handleSubmit } = form

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
            alert('Successfully loged in! Welcome!')
            navigate('/createUserTask');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No server response')
            }
            if (err?.response?.status === 400) {
                console.log(user)
                alert("Invalid credentials")
            }
        }
    }

    const paperStyle = { padding: 60, height: 500, width: 500, margin: "100px auto"}

    return (
        <>
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid marginLeft={10}>
                        <Avatar><FaceIcon /></Avatar>
                        <h1>Login</h1>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3} width={250} marginLeft={10}>
                            <div>
                                <FormLabel>Enter email</FormLabel><br />
                                <TextField label='Email' type='email' {...register('email')} required onChange={(e) => setUser(e.target.value)} value={user} />
                            </div>
                            <div>
                                <FormLabel>Enter password </FormLabel><br />
                                <TextField label='Password' type='password'{...register('password')} required onChange={(e) => setPass(e.target.value)} value={pass} />
                            </div>
                            <Button type='submit' color='primary'>Login</Button>
                        </Stack>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}