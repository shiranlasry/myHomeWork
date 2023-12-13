
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.scss'
import LogIn from './components/logIn/LogIn'
import SingUp from './components/singUp/SingUp';

function App() {
const router =  createBrowserRouter([
  {path: '/', element: <LogIn />},
  {path: '/sign-up', element: <SingUp />}

])

  return <RouterProvider router={router} />;
}

export default App
