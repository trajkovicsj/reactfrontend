import { useEffect, useState } from 'react';
import Axios from 'axios';
import './styles.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function Users() {

  const [users, setUsers] = useState<any[]>([{}]);
  const [error, setError] = useState(null);
  const [numberOfUsers, setNumberOfUsers] = useState();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    // let user: any = localStorage.getItem('user')
    //   console.log(user)
    // if (user !== 1) {
    //   <Navigate to='/unauthorized' />
    // }
    Axios('http://localhost:8000/user-controller/getUsers')
      .then((response) => {
        setError(null);
        setUsers(response.data);
        console.log(response.data)
        console.log(localStorage.getItem('token'))
      })
      .catch(setError);
  }, []);


  useEffect(() => {
    const user: any = localStorage.getItem('user')
      console.log(user)
    if (user !== 1) {
      <Navigate to='/unauthorized' />
    }
    Axios('http://localhost:8000/user-controller/numberOfUsers')
      .then((response) => {
        setError(null);
        setNumberOfUsers(response.data);
        console.log(response.data)
      })
      .catch(setError);
  }, []);

  //Object.values(users).map((user, i) => console.log(user))
  return (
    <div className='main'>
      <h1 className='heading'>Users</h1>
      <h3>Number of users: {numberOfUsers}</h3>
      {
        Object.values(users).map((user, i) => {
          return (
            <div className='elements' key={i}>
              <table align='center'>
                <tr>
                  <th>ID:</th>
                  <th>Email:</th>
                  <th>Created at:</th>
                  <th>First name:</th>
                  <th>Last name:</th>
                </tr>
                <tr>
                  <td>{user.idUser}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td></tr>
              </table>
            </div>
          )
        }
        )
      }
    </div>
  )
}
export default Users;
