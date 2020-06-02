import React,{useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import {apiUrl} from './config/config'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'

import ProjectsMain from './components/ProjectsMain'
import NavBar from './components/NavBar'

axios.defaults.withCredentials = true

function App() {
  const [loggedIn, setLoggedIn] = useState("")

  useEffect(()=>{
    console.log(apiUrl)
    axios
      .post(apiUrl+"/auth/login",{"email": "firstclient@hotmail.com", "passw": "salasana2"})
      .then(function(response){
        console.log(response.data)
        setLoggedIn(response.data)
      })
  },[])
  
  const ShowPartsmain = ()=>{
    if (loggedIn ==="welcome in"){
      return <div><ProjectsMain/></div>
    }
    else{
      return <div></div>
    }
  }

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
