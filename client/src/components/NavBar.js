import React from 'react'
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="nav-bar">
            <div className ="nav-bar-item-container">
                <Link className="nav-bar-item" to="/frontpage">Front page</Link>
            </div>
            <div className ="nav-bar-item-container">
                <Link className="nav-bar-item" to="/projects">Projects</Link>
            </div>
        </div>
    )   
}


export default NavBar;