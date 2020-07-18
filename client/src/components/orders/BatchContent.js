import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'

const BatchContent = (props) =>{
    const [batchData, setBatchData] = useState([]);

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getbatchcontent", {"batchId": props.selectedBatch})
            .then(function(result){
                console.log(result.data)
                setBatchData(result.data)
            })
    },[props.selectedBatch])

    return (
        <div className = "order-batch-data-container">
            {
                batchData.map(e=>{
                    return (
                        <div className="order-batch-content-item" key={e.partId}>{e.partName}<br></br></div>
                    )
                })
            }
        </div>
    )
}

export default BatchContent;