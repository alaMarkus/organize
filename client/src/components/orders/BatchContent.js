import React,{useEffect, useState} from 'react'
import './batchcontent.css'
import axios from 'axios'
import {apiUrl} from '../../config/config'

const BatchContent = (props) =>{
    const [batchData, setBatchData] = useState([]);

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getbatchcontent", {"batchId": props.selectedBatch})
            .then(function(result){
                //console.log(result.data)
                const partIdArray = result.data.map(e=>{return e.partId})
                console.log(partIdArray)
                partIdArray.forEach(e=>{
                    axios
                    .post(apiUrl+"/api/part/getpart", {"partId": e})
                    .then(function(result2){
                        console.log(result2.data)
                        setBatchData(result2.data)
                    })
                })
            })
    },[props.selectedBatch])

    return (
        <div className = "batch-data-container">
            {
                batchData.map(e=>{
                    return (
                        <div>{e.partId}<br></br></div>
                    )
                })
            }
        </div>
    )
}

export default BatchContent;