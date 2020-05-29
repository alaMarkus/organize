import React,{useEffect, useState} from 'react';
import './App.css';
import Posteditor from './components/Posteditor';
import ProjectMenu from './components/ProjectsMenu'
import axios from 'axios'
import {apiUrl} from './config/config'
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
  
  const ShowMenu = ()=>{
    if (loggedIn ==="welcome in"){
      return <div><ProjectMenu/></div>
    }
    else{
      return <div></div>
    }
  }

  return (
    <div className="App">
      {ShowMenu()}
    </div>
  );
}

export default App;
