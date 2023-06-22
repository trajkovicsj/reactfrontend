import Users from './components/Administrator/Users';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UsersTasks from './components/Administrator/UsersTasks';
import CreateUser from './components/Administrator/CreateUser';
import Unauthorized from './components/ProtectedRoutes/Unauthorized';
import CreateUserTask from './components/User&Administrator/CreateUserTask';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
import Logout from './components/User&Administrator/Logout';
import ProtectedRoute2 from './components/ProtectedRoutes/ProtectedRoute2';
import UserTasksByUser from './components/User&Administrator/UserTasksByUser';
import { MuiLoginForm } from './components/User&Administrator/MuiLoginForm';
import Navigation from './components/Navigation';

function App() {

  return (
    <>
    
      <Navigation />
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* public routes */}
          <Route path='login' element={<MuiLoginForm/>}/>
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="logout" element={<Logout />} />

          {/*protected routes*/}
          <Route path='users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path='createUser' element={<ProtectedRoute><CreateUser /></ProtectedRoute>} />
          <Route path='usersTasks' element={<ProtectedRoute><UsersTasks /></ProtectedRoute>} />
          <Route path='createUserTask' element={<ProtectedRoute2><CreateUserTask /></ProtectedRoute2>} />
          <Route path='taskList' element={<ProtectedRoute2><UserTasksByUser /></ProtectedRoute2>} />
        </Route>
      </Routes>
      </>
     
  )
}
export default App;
