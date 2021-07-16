import { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { useAuth, login } from '../../utils/auth'
import './Login.css'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubmitted, changeIsAuthenticated])

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className='login-form'>
        <fieldset className='login-form__fieldset'>
          <legend className='login-form__legend'>Sign In</legend>
          <label htmlFor='email' className='login-form__label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter email'
            className='login-form__input'
          />
          <label htmlFor='password' className='login-form__label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter password'
            className='login-form__input'
          />
          <div className='flex flex_row flex_align-items-center'>
            <input
              type='checkbox'
              id='remember'
              name='remember'
              className='login-form__input login-form__input_remember'
            />
            <label
              htmlFor='remember'
              className='login-form__label login-form__label_secondary'
            >
              Remember me
            </label>
          </div>
          <input
            type='submit'
            value='Submit'
            className='login-form__input login-form__input_submit'
          />
        </fieldset>
        <small className='d-block text-end text-secondary'>
          Forgot{' '}
          <a href='/forgot-password' className='link'>
            password?
          </a>
        </small>
      </form>
    </Fragment>
  )
}
export default Login
