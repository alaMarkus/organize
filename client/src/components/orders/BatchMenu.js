import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'
import  {MenuItem, Button} from '@material-ui/core'
import './batchmenu.css'

import BatchContent from './BatchContent'
import MyMenuItem from '../elements/MyMenuItem'

const BatchsMenu = (props)=> {
    const [batchList, setBatchList] = useState([])
    const [selectedBatch, setSelectedBatch] = useState(1)
    const [newBatchName, setNewBatchName] = useState("")
    const [reRender, reRenderCause] = useState("")
    const [deleteButtons, showDeleteButtons] = useState("Delete Batches")

    useEffect(()=>{
        axios
        .post(apiUrl+"/api/part/getBatches")
        .then(function(result){
            console.log(result.data)
            setBatchList(result.data)
        })
    },[reRender])

    const clickedBatch =(e) =>{
        console.log(e.currentTarget.id)
        console.log(e.target.id)
        if(e.currentTarget.id===e.target.id){
            setSelectedBatch(e.target.id)
        }
    }

    const handleInput = (e) =>{
        setNewBatchName(e.target.value)
        console.log(newBatchName)
    }

    const addBatch = (e) =>{
        e.preventDefault()
        if (newBatchName != "")
            {
            axios
                .post(apiUrl+"/api/part/insertbatch", {"batchName":newBatchName})
                .then(function(result){
                    console.log(result.data)
                    reRenderCause(result.data+newBatchName)
                    setNewBatchName("")
                })
        }else{
            alert("Batch needs a name!")
        }
    }

    const deleteBatch = (e) =>{
        const batchToDelete = e.currentTarget.dataset.myid
        console.log("currentTarget:")
        console.log(batchToDelete)
        let confirmed = window.confirm("delete batch and its contents?")
        if (confirmed){
            axios
            .post(apiUrl+"/api/part/deletebatch", {"batchId": batchToDelete})
            .then(function(result){
                console.log(result.data)
                setSelectedBatch(1)
                reRenderCause(result.data+batchToDelete)
                console.log("rerender:")
                console.log(reRender)
            })
        }
    }

    const showDelete = () =>{
        if (deleteButtons==="Delete Batches"){
            showDeleteButtons("Done")
        }else if (deleteButtons==="Done"){
            showDeleteButtons("Delete Batches")
        }
        console.log(deleteButtons)
    }

    return (
        <div className="batch-container" >
            <div className="menus-container">
                <div className="batch-menu-container">
                    <div className="batch-list">
                        <div className="batch-header-container">
                            <h5>Batches</h5>
                            <Button className ="show-delete-button" variant="text" size="small" color="primary" onClick={showDelete}>{deleteButtons}</Button>
                        </div>
                        {batchList.map(e=>{
                            return (
                                    <MyMenuItem className="menu-item" selected={selectedBatch==e.batchId} key={e.batchId} id={e.batchId} onClick={clickedBatch} text ={e.batchName} delete={deleteButtons} onDeleteClick={deleteBatch} myid={e.batchId}/>
                            )
                        })}
                        <div className="add-batch-container">
                            <form onSubmit={addBatch}>
                                <input onChange={handleInput} className="new-batch-input" placeholder="Batch name" value={newBatchName}/>
                                <Button className="add-batch-button" type="submit" variant ="contained" color="primary" fullWidth={true}>Add</Button>
                            </form>
                        </div>
                    </div>
                    <div className = "parts-container">
                        <BatchContent selectedBatch = {selectedBatch}/>
                    </div>
                </div>        
            </div>
        </div>
    )
}


export default BatchsMenu;