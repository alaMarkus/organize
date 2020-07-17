import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'

const BatchContent = (props) =>{
    const [batchData, setBatchData] = useState([]);
    console.log("propsrender:" +props.renderBatchContent)

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getbatchcontent", {"batchId": props.selectedBatch})
            .then(function(result){
                console.log(result.data)
                setBatchData(result.data)
            })
    },[props.selectedBatch, props.reRenderBatch])

    return (
        <div className = "batch-data-container">
            {
                batchData.map(e=>{
                    return (
                        <div id={e.partId} key={e.partId}>{e.partName}<br></br></div>
                    )
                })
            }
        </div>
    )
}

export default BatchContent;