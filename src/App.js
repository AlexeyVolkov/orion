import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import { AuthProvider, useAuth } from './utils/auth'

import './App.css'

const PrivateRoute = ({ children, ...props }) => {
  const [isAuthenticated] = useAuth()

  return (
    <Route
      {...props}
      render={() => (isAuthenticated ? children : <Redirect to='/login' />)}
    />
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/'>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
