import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Users from './Users';
import User from './User';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Link to="/"><h1>LOTRFACE</h1></Link>

          <Route exact path="/" component={Users} />
          <Route path="/users/:id" component={User} />


      </div>
    );
  }
}

export default App;
