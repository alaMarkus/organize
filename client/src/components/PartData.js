import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem} from '@material-ui/core'

const PartData = (props)=>{
    const [partData, setPartData] = useState([])

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getpart",{"partId": props.partId})
            .then(function(result){
                console.log(result.data)
                setPartData(result.data)
            })
    },[props.partId])

    return (
        <div>
            {partData.map(e=>{
                return (
                    <div>{e.partName}</div>
                )
            })}
        </div>
    )
}

export default PartData