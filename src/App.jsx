import React from 'react';
import './App.scss';

import Navigation from './components/navigation'
import MatchPage from './components/matchPage'
function App() {
  return (
    <div className="App">
      <Navigation/>
      <div style={{marginLeft:'160px'}}>    
        <MatchPage></MatchPage>
      </div>
    </div>
  );
}

export default App;
