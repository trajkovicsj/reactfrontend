import { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Users = () => {

  const [users, setUsers] = useState<any[]>([{}]);
  const [error, setError] = useState(null);
  const [numberOfUsers, setNumberOfUsers] = useState();

  useEffect(() => {
    axiosInstance('/user-controller/getUsers')
      .then((response) => {
        setError(null);
        setUsers(response.data);
        console.log(response.data)
        console.log(localStorage.getItem('token'))
      })
      .catch(setError);
  }, []);

  useEffect(() => {
    axiosInstance('/user-controller/numberOfUsers')
      .then((response) => {
        setError(null);
        setNumberOfUsers(response.data);
        console.log(response.data)
      })
      .catch(setError);
  }, []);

  const deleteRow = (id: any) => {
    console.log(id)
    try {
        const response = axiosInstance.delete('/user-controller/delete-user' + id)
        console.log(response)
        alert('User successfully deleted')
        window.location.reload()
    }
    catch (err) {
        console.log(err)
    }
}

  const paperStyle = { padding: '20px', margin: '50px auto' }

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <h1 className='heading'>Users</h1>
        <h3>Number of users: {numberOfUsers}</h3><br/>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Delete user</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(users).map((user, i) => (
                <TableRow key={i}>
                  <TableCell>{user.idUser}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell><Button color='error' onClick={() => deleteRow(user.idUser)}>Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> </Grid>
  )
}
export default Users
