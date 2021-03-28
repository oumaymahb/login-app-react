import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './components/header.component'
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Dashboard from "./components/dashboard.component";
import PrivateRoute from './components/PrivateRoute'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
   
  }
  
  render() {
   
  
  
    return (
    
      < >
       

        <BrowserRouter>
        <Header/>
          <Switch>
          
          <Route  path="/login" name="Login Page" component={Login} />
          <Route  path="/signup" component={Signup} />
          <PrivateRoute  path="/dashboard" component={Dashboard}  />
          <Route  exact path="/" name="Home Page" component={Login} />
          </Switch>
          </BrowserRouter>
      </>
    );
  }
}

export default App;