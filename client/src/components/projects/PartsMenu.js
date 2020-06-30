import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'
import {Button} from '@material-ui/core'
import './partsmenu.css'

import MyMenuItem from '../elements/MyMenuItem'
import PartData from './PartData'
import NewPart from './NewPart'

const PartsMenu = (props) => {
    const [partList, setPartList] = useState([])
    const [addOrShow, setAddOrShow] = useState("show")
    const [selectedPart, setSelectedPart] = useState(1)
    const [reRender, reRenderCause] = useState({})
    const [deleteButtons, showDeleteButtons] = useState("Delete Parts")

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getparts", {"projectId": props.projectId})
            .then(function(result){
                console.log(result.data)
                setPartList(result.data)
            })
    },[props.projectId,reRender])

    const clickedPart = (e) =>{
        console.log(e.target.id)
        setSelectedPart(e.target.id)
        setAddOrShow("show")
    }

    const deletePart = (e) => {
        let partToDelete = e.currentTarget.dataset.myid
        console.log("currentTarget:")
        console.log(partToDelete)
        let confirmed = window.confirm("delete part?")
        if (confirmed){
            axios
            .post(apiUrl+"/api/part/deletepart", {"partId": partToDelete})
            .then(function(result){
                console.log("result data:")
                console.log(result.data)
                setSelectedPart(1)
                reRenderCause(result.data+partToDelete)
                console.log("rerender:")
                console.log(reRender)
            })
        }
    }
    
    const newPart = () =>{
        setAddOrShow("add")
    }

    const updatePartList = (data) =>{
        reRenderCause(data)
    }

    const selectAddOrShow = (data) =>{
        if (data==="show"){
            return (
                <PartData partId={selectedPart}/>
                )
        }
        if (data==="add"){
            return (
                <NewPart partList={partList} projectId={props.projectId} updatePartList={updatePartList}/>
            )
        }
    }
    const showDelete = () =>{
        if (deleteButtons==="Delete Parts"){
            showDeleteButtons("Done")
        }else if (deleteButtons==="Done"){
            showDeleteButtons("Delete Parts")
        }
        console.log(deleteButtons)
    }

    return (
        <div className="parts-container">
            <div className="parts-menu-container">
                <div className="parts-list">
                    <div className="parts-header-container">
                        <h5>Parts</h5>
                        <Button className ="show-delete-button" variant="text" size="small" color="primary" onClick={showDelete}>{deleteButtons}</Button>
                    </div>
                    {partList.map(e=>{
                        return (
                            <MyMenuItem selected={selectedPart==e.partId} key={e.partId} id={e.partId} onClick={clickedPart} text={e.partName} delete={deleteButtons} onDeleteClick={deletePart} myid={e.partId}/>
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