import { useEffect, useState } from 'react';
import './styles.css'
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axios';

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
