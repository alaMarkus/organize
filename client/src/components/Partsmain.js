import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem, Button} from '@material-ui/core'
import'./partsmain.css'

import ProjectsMenu from './ProjectsMenu'
import PartsMenu from './PartsMenu'
import PartData from './PartData'
import newPart from './NewPart'
import NewPart from './NewPart';

const PartsMain = () => {
    const [selectedProject, setSelectedProject] = useState(1)
    const [selectedPart, setSelectedPart] = useState(1)
    const [addOrShow, setAddOrShow] = useState("show") 
    const [newProjectName, setNewProjectName] = useState("")

    const clickedProject =(e) =>{
        console.log(e.target.id)
        setSelectedProject(e.target.id)
    }
    
    const clickedPart = (e) =>{
        console.log(e.target.id)
        setSelectedPart(e.target.id)
        setAddOrShow("show")
    }

    const newPart = () =>{
        setAddOrShow("add")
    }

    const handleInput = (e) =>{
        setNewProjectName(e.target.value)
        console.log(newProjectName)
    }

    const addProject = () =>{
        axios
            .post(apiUrl+"/api/part/insertproject", {"projectName":newProjectName})
            .then(function(result){
                console.log(result)
            })
    }

    function selectAddOrShow(){
        if (addOrShow==="show"){
            return (
                <PartData partId={selectedPart}/>
                )
        }
        if (addOrShow==="add"){
            return (
                <NewPart projectId={selectedProject}/>
            )
        }
    }

    return (
        <div className="parts-main-container">
            <div className="menus-container">
                <div className="projects-menu-container">
                    <ProjectsMenu clickedProject={clickedProject}/>
                    <input onChange={handleInput} className="new-project-input" placeholder="project name"/>
                    <Button onClick={addProject} variant ="contained" color="primary" fullWidth="true">Add</Button>
                </div>
                <div className="parts-menu-container">
                    <PartsMenu projectId={selectedProject} clickedPart={clickedPart} />
                    <Button onClick={newPart} size="small" variant="contained" color="primary" className ="new-part-button">New Part</Button>
                </div>
            </div>
            <div className="parts-data-container">
                {selectAddOrShow()}
            </div>
        </div>
    )
}

export default PartsMain;

