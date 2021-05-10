import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import MainContent from './components/MainContent/MainContent'
import Footer from './components/Footer/Footer'
import Post from './components/Post/Post'

import AuthContext from './components/shared/AuthContext'
import AuthHook from './components/shared/AuthHook'

const App = () => {
  const [sticky, setSticky] = useState(false)
  const { login, id, isloggedin, token, logout } = AuthHook()

  const handleSticky = () => {
    if(window.pageYOffset > 100) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  window.addEventListener('scroll', handleSticky)

  return (
    <AuthContext.Provider value={{
      login: login,
      id: id,
      isloggedin: isloggedin,
      token: token,
      logout: logout
    }}>
      <div className="App">   
        <Navigation className={sticky ? "Navigation sticky" : "Navigation"}/> 
        <Router>
          <Switch>
            <Route exact path="/" component={MainContent} /> 
            <Route exact path="/post/:id" component={Post} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
