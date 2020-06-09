import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import  {MenuItem, Button} from '@material-ui/core'
import './projectsmenu.css'

import PartsMenu from './PartsMenu'
import MyButton from './elements/CustomButton'
import MyMenuItem from './elements/MyMenuItem'

const ProjectsMenu = (props)=> {
    const [projectsList, setProjectList] = useState([])
    const [selectedProject, setSelectedProject] = useState(1)
    const [newProjectName, setNewProjectName] = useState("")
    const [inserted, setInserted] = useState("")
    const [deleteButtons, showDeleteButtons] = useState("hide")

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
        if(e.target.id !== ""){
            setSelectedProject(e.target.id)
        }
    }

    const handleInput = (e) =>{
        setNewProjectName(e.target.value)
        console.log(newProjectName)
    }

    const addProject = () =>{
        if (newProjectName != "")
            {
            axios
                .post(apiUrl+"/api/part/insertproject", {"projectName":newProjectName})
                .then(function(result){
                    console.log(result.data)
                    setInserted(result.data+newProjectName)
                    setNewProjectName("")
                })
        }else{
            alert("project needs a name!")
        }
    }

    const deleteProject = (e) =>{
        let projectToDelete = e.target.parentNode.id
        if(projectToDelete===""){
           projectToDelete = e.target.parentNode.parentNode.id;
        }
        console.log(projectToDelete)
        let confirmed = window.confirm("delete project and its contents?")
        if (confirmed){
            axios
            .post(apiUrl+"/api/part/deleteproject", {"projectId": e.target.parentNode.id})
            .then(function(result){
                console.log(result.data)
                setSelectedProject(1)
                setInserted(result.data+projectToDelete)
            })
        }
    }

    const showDelete = () =>{
        if (deleteButtons==="hide"){
            showDeleteButtons("show")
        }else if (deleteButtons==="show"){
            showDeleteButtons("hide")
        }
        console.log(deleteButtons)
    }

    return (
        <div className="project-container" >
            <div className="menus-container">
                <div className="projects-menu-container">
                    <div className="projects-list">
                        <div className="projects-header-container">
                            <Button variant="contained" size="small" color="primary" onClick={showDelete}>Delete projects</Button>
                            <h5>Projects</h5>
                        </div>
                        {projectsList.map(e=>{
                            return (
                                    <MyMenuItem className="menu-item" selected={selectedProject==e.projectId} key={e.projectId} id={e.projectId} onClick={clickedProject} text ={e.projectName} delete={deleteButtons} onDeleteClick={deleteProject}/>
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