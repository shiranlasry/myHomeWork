//logIn.tsx
import './LogIn.scss'

const LogIn = () => {
  return (
    <form className='log-in-form'>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
    </form>
  )
}

export default LogIn
