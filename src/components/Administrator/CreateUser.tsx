import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../../axios';
import { useForm } from 'react-hook-form';
import { Button, FormLabel, Grid, Paper, Stack, TextField } from '@mui/material';

type FormValues = {
    email: string
    password: string
    first_name: string
    last_name: string
}

const CreateUser = () => {

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
    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        }
    }
    );

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

    const paperStyle = { padding: 70, height: 700, width: 500, margin: "100px auto" }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <h1>Create user</h1>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} width={200} marginLeft={10}>
                        <div>
                            <FormLabel>Enter email</FormLabel><br />
                            <TextField label='Email' type='email' {...register('email')} required onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                        <div>
                            <FormLabel>Enter password</FormLabel><br />
                            <TextField label='Password' type='password' {...register('password')} required onChange={(e) => setPass(e.target.value)} value={pass} />
                        </div>
                        <div>
                            <FormLabel>Enter first name</FormLabel><br />
                            <TextField label='First name' type='first_name' {...register('first_name')} required onChange={(e) => setFirstname(e.target.value)} value={first_name} />
                        </div>
                        <div>
                            <FormLabel>Enter last name</FormLabel><br />
                            <TextField label='Last name' type='last_name' {...register('last_name')} required onChange={(e) => setLastname(e.target.value)} value={last_name} />
                        </div>
                        <Button type='submit' color='success'>Add</Button>
                    </Stack>
                </form>
            </Paper>
        </Grid>
    )
}

export default CreateUser
