import React,{useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import {apiUrl} from './config/config'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'

import ProjectsMain from './components/projects/ProjectsMain'
import Orders from './components/orders/Orders'
import NavBar from './components/NavBar'
import Testing from './components/testing/Testing'

axios.defaults.withCredentials = true

function App() {
  const [loggedIn, setLoggedIn] = useState("")

  useEffect(()=>{
    console.log(apiUrl)
    axios
      .post(apiUrl+"/auth/login",{"email": "exampleClient@hotmail.com", "passw": "salasana"})
      .then(function(response){
        console.log(response.data)
        setLoggedIn(response.data)
      })
  },[])

  return (
    <div className="App">
      <Router>
        <Route path="/">
          <NavBar/>
        </Route>
        <Switch>
        <Route path="/frontpage">
          <div>this is frontpage</div>
        </Route>
        <Route path="/projects">
          <ProjectsMain/>
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/testing">
          <Testing />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
