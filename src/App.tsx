import Users from './components/Users';
import LoginForm from './components/LoginForm';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import UsersTasks from './components/UsersTasks';
import CreateUser from './components/CreateUser';
import Unauthorized from './components/Unauthorized';
import CreateUserTask from './components/CreateUserTask';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route path='login' element={<LoginForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />



        {/* <Route element={<RequireAuth2 />}> */}
        <Route path='createUserTask' element={<CreateUserTask />} />
        {/* </Route> */}

        {/*protected routes*/}
        {/* <Route element={<ProtectedRoute />}> */}
        {/* <Route element={<RequireAuth />}> */}
          <Route path='users' element={<Users />} />
          {/* </Route> */}
          <Route path='createUser' element={<CreateUser />} />
          <Route path='usersTasks' element={<UsersTasks />} />
        </Route>
      {/* </Route> */}
      {/* </Route> */}
    </Routes></>
  )
}
export default App;
