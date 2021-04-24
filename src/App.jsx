import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';

import Navigation from './components/navigation'
import MatchPage from './components/matchPage'
import PostAuthPage from './components/postAuthPage'
import HomePage from './components/homePage'
import './App.scss';
function App() {
  return (
    <HttpsRedirect>
      
        <Router>
          <div className="App"> 
            <Navigation/>
            <div style={{marginLeft:'160px'}}>   
              <Route path="/auth/redirected" component={PostAuthPage}></Route>
              <Route path="/play" component={MatchPage}/>
              <Route exact path="/" component={HomePage} />
            </div>
          </div>
        </Router>

    </HttpsRedirect>
  );
}

export default App;