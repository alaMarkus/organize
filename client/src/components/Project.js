import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'

const Project = (props) =>{
    const [parts, setParts] = useState([])
    console.log(props.projectId)
    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getparts",{"projectId" : props.projectId})
            .then(function(result){
                console.log(result.data)
                setParts(result.data)
            })
    },[props.projectId])

    return (
        <ul>
            {parts.map(e=>{
                return (
                   <li key={e.partId}>{e.partName}</li>
                )
            })}
        </ul>
    )
}

export default Project;