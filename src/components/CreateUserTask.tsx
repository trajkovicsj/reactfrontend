import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axiosInstance from '../axios';
import { useForm } from 'react-hook-form';
import { Button, FormLabel, Grid, Paper, Stack, TextField } from '@mui/material';

type FormValues = {
    taskDescription: string
}

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
    
    const form = useForm<FormValues>({
        defaultValues: {
            taskDescription : ''
        }
    })
    const { register, handleSubmit } = form

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

    const paperStyle = { padding: 70, height: 350, width: 500, margin: "150px auto"}

    return (
         <>
         <Grid>
             <Paper elevation={20} style={paperStyle}>
                 <Grid marginLeft={10}>
                     <h1>Create task</h1>
                 </Grid>
                 <form onSubmit={handleSubmit(onSubmit)}>
                     <Stack spacing={3} width={250} marginLeft={10}>
                         <div>
                             <FormLabel>Task description</FormLabel><br />
                             <TextField label='Task description' type='taskDescription' {...register('taskDescription')} required onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} />
                         </div>
                         <Button type='submit' color='primary'>Add</Button>
                     </Stack>
                 </form>
             </Paper>
         </Grid>
     </>
    )
}
export default CreateUserTask
