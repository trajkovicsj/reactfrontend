import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function UserTasksByUser() {
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    const [tasks, setTasks] = useState<any[]>([{}]);
    const [User_idUser, setUser] = useState(localStorage.getItem('user'))
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('/task/userTasks' + User_idUser)
            .then((response) => {
                setError(null);
                setTasks(response.data);
                setUser(localStorage.getItem('user'))
                console.log(User_idUser)
                console.log(response.data)
                if (tasks.length === 0) {
                    console.log('no tasks')
                }
            })
            .catch(setError);
    }, []);

    const deleteRow = (id: any) => {
        console.log(id)
        try {
            const response = axiosInstance.delete('/task/delete-task' + id)
            console.log(response)
            alert('Task successfully deleted')
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }
    const paperStyle = {padding: '20px', margin: '50px auto'}

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <h1 className='heading'>Tasks:</h1>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task Description</TableCell>
                                <TableCell>Done</TableCell>
                                <TableCell>Delete task</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.values(tasks).map((task, i) => (
                                <TableRow key={i}>
                                    <TableCell>{task.taskDescription}</TableCell>
                                    <TableCell>{task.done}</TableCell>
                                    <TableCell><Button color='error' onClick={() => deleteRow(task.idTodoItems)}>Delete</Button></TableCell>
                                </TableRow>))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    )
}

export default UserTasksByUser;