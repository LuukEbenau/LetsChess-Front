import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';
import { connect } from 'react-redux';
import { Component } from 'react';

import './App.scss';

import Navigation from './components/navigation'
import MatchPage from './components/matchPage'
import PostAuthPage from './components/postAuthPage'
import HomePage from './components/homePage'
import WaitingForMatchPage from './components/waitingForMatch'

class Page extends Component {
  state = {redirect: null}
	render() { 
		return ( 		
      <HttpsRedirect>
        <Router>
          <div className="App"> 
            <Navigation/>
            <div style={{marginLeft:'160px'}}>   
              <Route path="/auth/redirected" component={PostAuthPage}></Route>
              <Route path="/match/:matchId" component={MatchPage}/>
              <Route path="/waitingformatch" component={WaitingForMatchPage}/>
              <Route exact path="/" component={HomePage} />
            </div>
          </div>
        </Router>
      </HttpsRedirect>
		 )
	}
}




const mapStateToProps = state => {
  return {
    
  }
}


const ConnectedPage = connect(
  mapStateToProps,
  null
)(Page)


export default ConnectedPage