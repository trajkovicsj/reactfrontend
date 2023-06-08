import { useEffect, useState } from 'react';
import './styles.css'
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axios';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function UsersTasks() {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [tasks, setTasks] = useState<any[]>([{}]);
    const [error, setError] = useState(null);
    useEffect(() => {
        axiosInstance('/user-controller/numberOfUserTasks')
            .then((response) => {
                setError(null);
                setTasks(response.data);
                console.log(response.data)
            })
            .catch(setError);
    }, []);

    const paperStyle = { padding: '20px', margin: '50px auto' }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <h1 className='heading'>Users tasks</h1><br/>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>First name</TableCell>
                                <TableCell>Number of tasks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {Object.values(tasks).map((task, i) => (
                                <TableRow key={i}>
                                <TableCell>{task.idUser}</TableCell>
                                <TableCell>{task.first_name}</TableCell>
                                <TableCell>{task.tasks}</TableCell>
                              </TableRow>
                            ))}
                            </TableBody></Table></TableContainer></Paper></Grid>
             )
}
                            export default UsersTasks
