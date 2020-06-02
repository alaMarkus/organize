import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem} from '@material-ui/core'

import PartsMenu from './PartsMenu'

const ProjectsMenu = (props)=> {
    const [projectsList, setProjectList] = useState([])
    const [selectedProject, setSelectedProject] = useState(1)

    useEffect(()=>{
        axios
        .post(apiUrl+"/api/part/getprojects")
        .then(function(result){
            console.log(result.data)
            setProjectList(result.data)
        })
    },[])

    const clickedProject =(e) =>{
        console.log(e.target.id)
        setSelectedProject(e.target.id)
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
                            console.log("selected: "+props.selectedProject)
                            console.log("current:"+e.projectId)
                            return (
                                <MenuItem selected={props.selectedProject==e.projectId} key={e.projectId} id={e.projectId} onClick={clickedProject} children={e.projectName}/>
                            )
                        })}
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