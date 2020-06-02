import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem, Button} from '@material-ui/core'
import './partsmenu.css'


const PartsMenu = (props) => {
    const [partList, setPartList] = useState([])

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getparts", {"projectId": props.projectId})
            .then(function(result){
                console.log(result.data)
                setPartList(result.data)
            })
    },[props.projectId, props.partInserted])


    return (
        <div className="parts-list">
            <div className="parts-header-container">
                <h5>Parts</h5>
            </div>
            {partList.map(e=>{
                return (
                    <MenuItem selected={props.selectedPart==e.partId} key={e.partId} id={e.partId} onClick={props.clickedPart} children={e.partName} />
                )
            })}
        </div>
    )
}

export default PartsMenu