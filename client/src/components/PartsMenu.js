import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {Button} from '@material-ui/core'
import './partsmenu.css'

import MyMenuItem from './elements/MyMenuItem'
import PartData from './PartData'
import NewPart from './NewPart'

const PartsMenu = (props) => {
    const [partList, setPartList] = useState([])
    const [addOrShow, setAddOrShow] = useState("show")
    const [selectedPart, setSelectedPart] = useState(1)
    const [partInserted, setPartInserted] = useState({})

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getparts", {"projectId": props.projectId})
            .then(function(result){
                console.log(result.data)
                setPartList(result.data)
            })
    },[props.projectId,partInserted])

    const clickedPart = (e) =>{
        console.log(e.target.id)
        setSelectedPart(e.target.id)
        setAddOrShow("show")
    }
    
    const newPart = () =>{
        setAddOrShow("add")
    }

    const updatePartList = (data) =>{
        setPartInserted(data)
    }

    const selectAddOrShow = (data) =>{
        if (data==="show"){
            return (
                <PartData partId={selectedPart}/>
                )
        }
        if (data==="add"){
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
                            <MyMenuItem selected={selectedPart==e.partId} key={e.partId} id={e.partId} onClick={clickedPart} text={e.partName} />
                        )
                    })}
                    <div className="new-part-button-container">
                        <Button className="new-part-button" onClick={newPart} variant="contained" color="primary">New Part</Button>
                    </div>
                </div>
            </div>
            <div className = "parts-data-container">
                    {selectAddOrShow(addOrShow)}
            </div>
        </div>
    )
}

export default PartsMenu