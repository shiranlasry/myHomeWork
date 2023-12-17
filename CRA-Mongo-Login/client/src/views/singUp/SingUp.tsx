
import { NavLink, useNavigate } from 'react-router-dom'
import { singUp } from '../../api/usersApi'
import './singUp.scss'
import { useUser } from '../../context/userContext';

const SingUp = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handelSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const form = e.currentTarget
      const username = form.username.value
      const email = form.email.value
      const password = form.password.value
      const password2 = form.password2.value
      const city = form.city.value
      const street = form.street.value
      const houseNumber = form.houseNumber.value
      const apartmentNumber = form.apartmentNumber.value
      const user: User = {
        email,
        username,
        password,
        password2,
        city,
        street,
        houseNumber,
        apartmentNumber
      }

      const data = await singUp(user);
      debugger
      if (data) {
        setUser(data.userDB);
        alert('Sing Up Success')
        navigate('/homepage')
      }

    } catch (error) {
      console.error(error)
    }




  }

  return (
    <div className='main-sing-up' >
      <h1>Sing Up</h1>
      <form className='sing-up-form' onSubmit={handelSingUp}>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' />
        <label htmlFor='username'>User Name</label>
        <input type='text' name='username' id='username' />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <label htmlFor='password2'>Confirm Password</label>
        <input type='password' name='password2' id='password2' />
        <label htmlFor='city'>City</label>
        <input type='text' name='city' id='city' />
        <label htmlFor='street'>Street</label>
        <input type='text' name='street' id='street' />
        <label htmlFor='houseNumber'>House Number</label>
        <input type='text' name='houseNumber' id='houseNumber' />
        <label htmlFor='apartmentNumber'>Apartment Number </label>
        <input type='text' name='apartmentNumber' id='apartmentNumber' />

        <input type='submit' value='Sing Up' />


      </form>
      <NavLink to="/">Home</NavLink>
    </div>
  )
}

export default SingUp
