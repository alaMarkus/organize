import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import Project from './Project'

const ProjectMenu = () => {
    const [projects, setProjects] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [inserted, setInserted] = useState("")
    const [selectedProject, setSelectedProject] = useState(1)

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getprojects")
            .then(function(result){
                console.log(result.data)
                setProjects(result.data)
            })
    },[inserted])

    const handleChange = (e)=>{
        setInputValue(e.target.value)
    }
    const clickedProject = (e) =>{
        console.log(e.target.id)
        setSelectedProject(e.target.id)
    }

    const insertProject = () =>{
        axios
            .post(apiUrl+"/api/part/insertproject",{"projectName": inputValue})
            .then(function(response){
                console.log(response)
                if(response.status===200&&response.data==="inserted project"){
                    setInserted(inputValue)
                    console.log(projects)
                }
            })
    }

    return (
        <div className="projects-container">
            <div className="projects-menu-container">
                <ul>
                    {projects.map(e=>{
                        return (
                            <li key={e.projectId} id={e.projectId} onClick={clickedProject}>{e.projectName}</li>
                        )
                    })}
                    <label>
                        insert project
                        <input onChange={handleChange} value={inputValue} placeholder="project name"/>
                        <button onClick={insertProject}>insert</button>
                    </label>
                </ul>
            </div>
            <div className="parts-container">
                <Project projectId={selectedProject}/>
            </div>
        </div>
    )
}

export default ProjectMenu;