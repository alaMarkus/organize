import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem} from '@material-ui/core'

const ProjectsMenu = (props)=> {
    const [projectsList, setProjectList] = useState([])

    useEffect(()=>{
        axios
        .post(apiUrl+"/api/part/getprojects")
        .then(function(result){
            console.log(result.data)
            setProjectList(result.data)
        })
    },[props.inserted])

    return (
        <div className="projects-list">
            {projectsList.map(e=>{
                return (
                    <MenuItem key={e.projectId} id={e.projectId} onClick={props.clickedProject} children={e.projectName}/>
                )
            })}
        </div>
    )
}


export default ProjectsMenu;