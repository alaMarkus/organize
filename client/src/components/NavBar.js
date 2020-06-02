import React from 'react'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'
import Partsmain from './Partsmain'

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className ="nav-bar-item-container">
                <Link className="nav-bar-item" to="/projects">projects</Link>
            </div>
        </div>
    )   
}


export default NavBar;