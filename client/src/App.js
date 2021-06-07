import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import 'materialize-css'
import {AuthContext} from "./context/auth.context";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader"
import {Footer} from "./components/Footer"



function App() {
    const {token, login, logout, userId, userEmail, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader />
    }
  return (
<div className = "site">
      <AuthContext.Provider value = {{
          token, login, logout, userId, userEmail, isAuthenticated
      }}>
        <Router>
            {isAuthenticated && <Navbar email = {userEmail}/>}
           <div className = "site-content"><div className = "container">
                {routes}
           </div></div>
            {isAuthenticated && <Footer/>}
        </Router>
      </AuthContext.Provider>
</div>
  )
}

export default App
