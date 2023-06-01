import { useEffect, useState } from 'react';
import Axios from 'axios';
import './styles.css'
import { useLocation } from 'react-router-dom';

function UserTasksByUser() {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [tasks, setTasks] = useState<any[]>([{}]);
    const [User_idUser, setUser] = useState(localStorage.getItem('user'))
    const [error, setError] = useState(null);

    useEffect(() => {
        Axios.get('http://localhost:8000/task/userTasks' + User_idUser )
            .then((response) => {
                setError(null);
                setTasks(response.data);
                setUser(localStorage.getItem('user'))
                console.log(User_idUser)
                console.log(response.data)
            })
            .catch(setError);
    }, []);

    return (
        <div className='main'>
            <h1 className='heading'>Tasks:</h1>
            {
                Object.values(tasks).map((task, i) => {
                    return (
                        <div className='elements' key={i}>
                            <table align='center'>
                                <tr>
                                    <th>Task Description</th>
                                    <th>Done</th>
                                </tr>
                                <tr>
                                    <td>{task.taskDescription}</td>
                                    <td>{task.done}</td></tr>
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