import React, {useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {Button} from '@material-ui/core'
import'./partsmain.css'

import ProjectsMenu from './ProjectsMenu'
import PartsMenu from './PartsMenu'
import PartData from './PartData'
import NewPart from './NewPart';

const PartsMain = () => {
    const [selectedProject, setSelectedProject] = useState(1)
    const [selectedPart, setSelectedPart] = useState(1)
    const [addOrShow, setAddOrShow] = useState("show") 
    const [newProjectName, setNewProjectName] = useState("")
    const [inserted, setInserted] = useState("")
    const [partInserted, setPartInserted] = useState("")
    

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
                console.log(result.data)
                setInserted(result.data)
            })
    }

    const SelectAddOrShow = () =>{
        if (addOrShow==="show"){
            return (
                <PartData partId={selectedPart}/>
                )
        }
        if (addOrShow==="add"){
            return (
                <NewPart updatePartList={updatePartList} projectId={selectedProject}/>
            )
        }
    }

    const updatePartList = (data) =>{
        console.log("updatepartlist called")
        console.log(data)
        setPartInserted(data)
    }

    return (
        <div className="parts-main-container">
            <ProjectsMenu />
        </div>
    )
}

export default PartsMain;


