import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/login/Login";
import Page404 from "./views/Page404";
import SingUp from "./views/singUp/SingUp";
import HomePage from "./views/homepage/HomePage";


function App() {
  return (
    <Routes>
    <Route path="*" element={<Page404 />} />
 
    <Route index element={<Home />} />

    <Route path="/login" element={<Login />} />
    
    <Route path="/singup" element={<SingUp/>}/> 
    <Route path="/homepage" element={<HomePage />} />
  </Routes>

  );
}

export default App;
