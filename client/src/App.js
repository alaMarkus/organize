import React,{useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import {apiUrl} from './config/config'

import Partsmain from './components/Partsmain'
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
      return <div><Partsmain/></div>
    }
    else{
      return <div></div>
    }
  }

  return (
    <div className="App">
      <NavBar />
      {ShowPartsmain()}
    </div>
  );
}

export default App;
