import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'
import  {MenuItem, Button} from '@material-ui/core'
import './projectsmenu.css'

import PartsMenu from './PartsMenu'
import MyMenuItem from '../elements/MyMenuItem'

const ProjectsMenu = (props)=> {
    const [projectsList, setProjectList] = useState([])
    const [selectedProject, setSelectedProject] = useState(1)
    const [newProjectName, setNewProjectName] = useState("")
    const [reRender, reRenderCause] = useState("")
    const [deleteButtons, showDeleteButtons] = useState("Delete Projects")

    useEffect(()=>{
        axios
        .post(apiUrl+"/api/part/getprojects")
        .then(function(result){
            console.log(result.data)
            setProjectList(result.data)
        })
    },[reRender])

    const clickedProject =(e) =>{
        console.log(e.currentTarget.id)
        console.log(e.target.id)
        if(e.currentTarget.id===e.target.id){
            setSelectedProject(e.target.id)
        }
    }

    const handleInput = (e) =>{
        setNewProjectName(e.target.value)
        console.log(newProjectName)
    }

    const addProject = (e) =>{
        e.preventDefault()
        if (newProjectName != "")
            {
            axios
                .post(apiUrl+"/api/part/insertproject", {"projectName":newProjectName})
                .then(function(result){
                    console.log(result.data)
                    reRenderCause(result.data+newProjectName)
                    setNewProjectName("")
                })
        }else{
            alert("project needs a name!")
        }
    }

    const deleteProject = (e) =>{
        const projectToDelete = e.currentTarget.dataset.myid
        console.log("currentTarget:")
        console.log(projectToDelete)
        let confirmed = window.confirm("delete project and its contents?")
        if (confirmed){
            axios
            .post(apiUrl+"/api/part/deleteproject", {"projectId": projectToDelete})
            .then(function(result){
                console.log(result.data)
                setSelectedProject(1)
                reRenderCause(result.data+projectToDelete)
                console.log("rerender:")
                console.log(reRender)
            })
        }
    }

    const showDelete = () =>{
        if (deleteButtons==="Delete Projects"){
            showDeleteButtons("Done")
        }else if (deleteButtons==="Done"){
            showDeleteButtons("Delete Projects")
        }
        console.log(deleteButtons)
    }

    return (
        <div className="project-container" >
            <div className="menus-container">
                <div className="projects-menu-container">
                    <div className="projects-list">
                        <div className="projects-header-container">
                            <h5>Projects</h5>
                            <Button className ="show-delete-button" variant="text" size="small" color="primary" onClick={showDelete}>{deleteButtons}</Button>
                        </div>
                        {projectsList.map(e=>{
                            return (
                                    <MyMenuItem className="menu-item" selected={selectedProject==e.projectId} key={e.projectId} id={e.projectId} onClick={clickedProject} text ={e.projectName} delete={deleteButtons} onDeleteClick={deleteProject} myid={e.projectId}/>
                            )
                        })}
                        <div className="add-project-container">
                            <form onSubmit={addProject}>
                                <input onChange={handleInput} className="new-project-input" placeholder="project name" value={newProjectName}/>
                                <Button className="add-project-button" type="submit" variant ="contained" color="primary" fullWidth={true}>Add</Button>
                            </form>
                        </div>
                    </div>
                    <div className = "parts-container">
                        <PartsMenu projectId={selectedProject}/>
                    </div>
                </div>        
            </div>
        </div>
    )
}


export default ProjectsMenu;