import { Fragment, useState, useEffect } from 'react'
import { useAuth, logout } from '../../utils/auth'

const Home = () => {
  const [, changeIsAuthenticated] = useAuth()
  const [logoutClicked, setLogoutClicked] = useState(false)

  const handleLogoutClick = () => setLogoutClicked(true)

  useEffect(() => {
    if (logoutClicked) logout(changeIsAuthenticated)
  }, [logoutClicked, changeIsAuthenticated])

  return (
    <Fragment>
      <h1>Welcome Home!</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </Fragment>
  )
}

export default Home
