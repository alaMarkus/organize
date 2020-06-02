import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem, Button} from '@material-ui/core'
import './partsmenu.css'

import PartData from './PartData'
import NewPart from './NewPart'

const PartsMenu = (props) => {
    const [partList, setPartList] = useState([])
    const [addOrShow, setAddOrShow] = useState("show")
    const [selectedPart, setSelectedPart] = useState(1)
    const [inserted, setInserted] = useState({})

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getparts", {"projectId": props.projectId})
            .then(function(result){
                console.log(result.data)
                setPartList(result.data)
            })
    },[props.projectId,inserted])

    const clickedPart = (e) =>{
        console.log(e.target.id)
        setSelectedPart(e.target.id)
        setAddOrShow("show")
    }
    
    const newPart = () =>{
        setAddOrShow("add")
    }

    const updatePartList = (data) =>{
        setInserted(data)
    }

    const SelectAddOrShow = () =>{
        if (addOrShow==="show"){
            return (
                <PartData partId={selectedPart}/>
                )
        }
        if (addOrShow==="add"){
            return (
                <NewPart projectId={props.projectId} updatePartList={updatePartList}/>
            )
        }
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
            <div className = "parts-data-container">
                    <SelectAddOrShow />
            </div>
        </div>
    )
}

export default PartsMenu