import { useEffect, useState } from 'react';
import Axios from 'axios';
import './styles.css'
import { useLocation } from 'react-router-dom';

function UsersTasks() {
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [tasks, setTasks] = useState<any[]>([{}]);
    const [error, setError] = useState(null);
    useEffect(() => {
        Axios('http://localhost:8000/user-controller/numberOfTasks')
            .then((response) => {
                setError(null);
                setTasks(response.data);
                console.log(response.data)
            })
            .catch(setError);
    }, []);

    return (
        <div className='main'>
            <h1 className='heading'>Users tasks</h1>
            {
                Object.values(tasks).map((task, i) => {
                    return (
                        <div className='elements' key={i}>
                            <table align='center'>
                                <tr>
                                    <th>ID:</th>
                                    <th>First_name:</th>
                                    <th>Number of tasks:</th>
                                </tr>
                                <tr>
                                    <td>{task.idUser}</td>
                                    <td>{task.first_name}</td>
                                    <td>{task.tasks}</td></tr>
                            </table>
                        </div>
                    )
                }
                )
            }
        </div>
    )
}
export default UsersTasks;
