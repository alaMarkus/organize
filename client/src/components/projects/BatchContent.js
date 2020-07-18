import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'
import  {Button} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const BatchContent = (props) =>{
    const [batchData, setBatchData] = useState([]);
    const [deleteButtons, showDeleteButtons] = useState("Remove Parts")
    const [reRender, reRenderCause] = useState("")

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getbatchcontent", {"batchId": props.selectedBatch})
            .then(function(result){
                console.log(result.data)
                setBatchData(result.data)
            })
    },[props.selectedBatch, props.reRenderBatch, reRender])

    const DeleteIcon = (props) =>{
        if (deleteButtons ==="Done"){
            return (
                <DeleteForeverIcon className="remove-icon" onClick={props.onDeleteClick} data-myid={props.myid}/>
            )
        }else{
            return null;
        }
    }
    
    const showDelete = () =>{
        if (deleteButtons==="Remove Parts"){
            showDeleteButtons("Done")
        }else if (deleteButtons==="Done"){
            showDeleteButtons("Remove Parts")
        }
    }
    
    const deletePartFromBatch = (e) => {
        const partToDelete = e.currentTarget.dataset.myid
        console.log("part to delete: "+ partToDelete)
            axios
                .post(apiUrl+"/api/part/removepartfrombatch", {"partId": partToDelete, "batchId": props.selectedBatch})
                .then(function(result){
                    console.log(result.data)
                    reRenderCause(result.data+partToDelete)
                })
        
    }

    return (
        <div className ="batch-data-wrapper">
            <div className="batch-header-container">
                <h3 className="batch-content-header">Batch content</h3>
                <Button className ="show-delete-button" variant="text" size="small" color="primary" onClick={showDelete}>{deleteButtons}</Button>
            </div>
            <div className = "batch-data-container">
            {
                batchData.map(e=>{
                    return (
                        <div className="batch-data-item" id={e.partId} key={e.partId}>{e.partName}
                            <DeleteIcon myid={e.partId} onDeleteClick={deletePartFromBatch}/>
                        <br></br></div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default BatchContent;