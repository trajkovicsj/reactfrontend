import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UsersTasks from './components/UsersTasks';
import CreateUser from './components/CreateUser';
import Unauthorized from './components/Unauthorized';
import CreateUserTask from './components/CreateUserTask';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Logout from './components/Logout';
import ProtectedRoute2 from './components/ProtectedRoute2';
import UserTasksByUser from './components/UserTasksByUser';
import { MuiLoginForm } from './components/MuiLoginForm';

function App() {

  return (
    <>
    
      <Header />
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
