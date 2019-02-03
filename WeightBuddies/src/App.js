import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import NavBar from "./components/SimpleTabs";
import Home from "./components/Home";
import User from "./components/User";
// import About from "./About";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/* <NavBar /> */}
          {/* exact is because "/" encompasses all other routes since they have "/" */}
          <Route exact path="/" component={ Home } />
          <Route exact path="/user" component={ User } />
          {/* <Route exact path="/about" component={ About } /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
