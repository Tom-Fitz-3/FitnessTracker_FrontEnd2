import React, { useState, useEffect }from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import handleToken from './api/token'

import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Activities from './components/Activities';
import Routines from './components/Routines';


const App = () => {
    const [savedToken, setSavedToken] = useState(handleToken.grabToken());
    const [isLoggedIn, setIsLoggedIn] = useState(!!savedToken);

    useEffect(function() {
        setIsLoggedIn(!!savedToken);
    }, [savedToken]);

  return (
  <div className='app'>
    <main>
      <Router>
        <Route path="/"><Header isLoggedIn={isLoggedIn} setSavedToken={setSavedToken}/></Route>
        <Switch> 
          <Route path="/activities"><Activities isLoggedIn={isLoggedIn} /></Route>
          <Route path="/register"><Register setSavedToken={setSavedToken} /></Route>
          <Route path="/login"><Login setSavedToken={setSavedToken} /></Route>
          <Route path="/routines"><Routines /></Route>
        </Switch>
      </Router>
    </main>
  </div>
  )
}

ReactDOM.render(
    <Router><App /></Router>, 
    document.getElementById('App')
);