import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem, Button} from '@material-ui/core'
import './partsmenu.css'

import PartData from './PartData'


const PartsMenu = (props) => {
    const [partList, setPartList] = useState([])
    const [addOrShow, setAddOrShow] = useState("show")
    const [selectedPart, setSelectedPart] = useState(1)

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getparts", {"projectId": props.projectId})
            .then(function(result){
                console.log(result.data)
                setPartList(result.data)
            })
    },[props.projectId, props.partInserted])

    const clickedPart = (e) =>{
        console.log(e.target.id)
        setSelectedPart(e.target.id)
        setAddOrShow("show")
    }
    
    const newPart = () =>{
        setAddOrShow("add")
    }

    return (
        <div className="parts-container">
            <div className="parts-menu-container">
                <div className="parts-list">
                    <div className="parts-header-container">
                        <h5>Parts</h5>
                    </div>
                    {partList.map(e=>{
                        return (
                            <MenuItem key={e.partId} id={e.partId} onClick={clickedPart} children={e.partName} />
                        )
                    })}
                    <Button onClick={newPart} size="small" variant="contained" color="primary" className ="new-part-button">New Part</Button>
                </div>
            </div>
            <div className = "part-data-container">
                    <PartData partId={selectedPart}/>
            </div>
        </div>
    )
}

export default PartsMenu