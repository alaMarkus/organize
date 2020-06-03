import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem, Button} from '@material-ui/core'
import './projectsmenu.css'

import PartsMenu from './PartsMenu'
import MyButton from './elements/CustomButton'
import MyMenuItem from './elements/MyMenuItem'

const ProjectsMenu = (props)=> {
    const [projectsList, setProjectList] = useState([])
    const [selectedProject, setSelectedProject] = useState(1)
    const [newProjectName, setNewProjectName] = useState("")
    const [inserted, setInserted] = useState("")

    useEffect(()=>{
        axios
        .post(apiUrl+"/api/part/getprojects")
        .then(function(result){
            console.log(result.data)
            setProjectList(result.data)
        })
    },[inserted])

    const clickedProject =(e) =>{
        console.log(e.target.id)
        setSelectedProject(e.target.id)
    }

    const handleInput = (e) =>{
        setNewProjectName(e.target.value)
        console.log(newProjectName)
    }

    const addProject = () =>{
        axios
            .post(apiUrl+"/api/part/insertproject", {"projectName":newProjectName})
            .then(function(result){
                console.log(result.data)
                setInserted(result.data)
                setNewProjectName("")
            })
    }


    return (
        <div className="project-container" >
            <div className="menus-container">
                <div className="projects-menu-container">
                    <div className="projects-list">
                        <div className="projects-header-container">
                            <h5>Projects</h5>
                        </div>
                        {projectsList.map(e=>{
                            return (
                                <MyMenuItem selected={selectedProject==e.projectId} key={e.projectId} id={e.projectId} onClick={clickedProject} text ={e.projectName}/>
                            )
                        })}
                        <div className="add-project-container">
                            <input onChange={handleInput} className="new-project-input" placeholder="project name" value={newProjectName}/>
                            <Button className="add-project-button" onClick={addProject} variant ="contained" color="primary" fullWidth={true}>Add</Button>
                        </div>
                    </div>
                    <div>
                        <PartsMenu projectId={selectedProject}/>
                    </div>
                </div>        
            </div>
        </div>
    )
}


export default ProjectsMenu;