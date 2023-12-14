
import { NavLink } from "react-router-dom";
import './home.scss'
import Login from "./login/Login";
const Home = () => {
  return (
    <div className="main-home">
      <h1> ANTIZAHEN</h1>
      <h2>Take all the furniture: table, bed, wardrobes, washing machine, sewing machine</h2>
      <Login/>
      <NavLink  className={'btn-navLink'} to="/singup">Sing Up</NavLink>
    
    </div>
  );
};

export default Home;
