
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import './App.scss'
import Page404 from './components/Page404'
import HomePage from './components/homepage/HomePage'
import Breeds from './components/breeds/Breeds'

function App() {
 
 

  const router= createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/breeds/:breed", element: <Breeds /> },
    { path: "*", element: <Page404 /> },
  ])


  return <RouterProvider router={router} />;
}

export default App
