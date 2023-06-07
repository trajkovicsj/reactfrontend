import { useEffect, useState } from 'react';
import './styles.css'
import { redirect, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

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

    return (
        <div className='main'>
            <h1 className='heading'>Tasks:</h1>
            {
                Object.values(tasks).map((task, i) => {
                    return (
                        <div className='elements' key={i}>
                            <table align='center'>
                                <tr>
                                    <th>Id task</th>
                                    <th>Task Description</th>
                                    <th>Done</th>
                                </tr>
                                <tr>
                                    <td>{task.idTodoItems}</td>
                                    <td>{task.taskDescription}</td>
                                    <td>{task.done}</td>
                                    <td><button onClick={() => deleteRow(task.idTodoItems)}>Delete</button></td></tr>
                            </table>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}
export default UserTasksByUser;