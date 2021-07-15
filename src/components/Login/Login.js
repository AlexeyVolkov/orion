import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useAuth, login } from '../../utils/auth'

const Login = () => {
  const [isAuthenticated, changeIsAuthenticated] = useAuth()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault()
    setFormSubmitted(true)
  }

  const [email, setEmail] = useState('')
  const handleEmailChange = (event) => setEmail(event.target.value)

  const [password, setPassword] = useState('')
  const handlePasswordChange = (event) => setPassword(event.target.value)

  useEffect(() => {
    if (formSubmitted) {
      login(changeIsAuthenticated, [email, password])
    }
    return () => {
      setFormSubmitted(false)
    }
  }, [formSubmitted, changeIsAuthenticated])

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={handleEmailChange}
          placeholder='admin@admin'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </fieldset>
      <input type='submit' />
    </form>
  )
}
export default Login
