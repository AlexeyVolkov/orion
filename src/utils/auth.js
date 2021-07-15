import { useContext, createContext, useState } from 'react'

const accessToken = 'accessToken'
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))
const getUser = (email, password) =>
  sleep(1000).then(() => {
    if (email === 'admin@admin' && password === 'admin') {
      return { accessToken: 'elmo' }
    } else {
      console.error('Wrong login data')
      throw Error('Wrong login data')
    }
  })
// const getUser = (email, password) =>
//   fetch('https://authserver.com', {
//     method: 'POST',
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   })

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const isAuthenticatedContext = useState(
    localStorage.getItem(accessToken) !== null
  )
  return (
    <AuthContext.Provider value={isAuthenticatedContext}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('useAuth should be inside AuthContext')
  }
  return context
}

const login = (changeIsAuthenticated, [email, password, ...rest]) =>
  getUser(email, password)
    // .then((response) => response.json())
    .then((json) => {
      if (json.accessToken) {
        changeIsAuthenticated(true)
        localStorage.setItem(accessToken, json.accessToken)
      } else {
        logout(changeIsAuthenticated)
      }
    })
    .catch(() => logout(changeIsAuthenticated))

const logout = (changeIsAuthenticated) => {
  changeIsAuthenticated(false)
  localStorage.removeItem(accessToken)
}

export { AuthProvider, useAuth, login, logout }
