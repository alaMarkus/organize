import React from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'

const Testing = () => {

    const addParts = () =>{
        for (let i=0; i<100; i++){
            const partObj = {"projectId":120, 
                            "partName": "parttest"+i,
                            "outsideDiameter": 60,
                            "insideDiameter": 30,
                            "partLength": 40,
                            "outsideChamfer": 1,
                            "insideChamfer": 1,
                            "outsideChamferType": "chamfer",
                            "insideChamferType": "chamfer"}
            console.log(partObj)
            axios
                .post(apiUrl+"/api/part/insertpart", {"partobj":partObj})
                .then(function(result){
                    console.log(result)
                })
       }
    }

    const partsToBatch = () => {
        for (let i = 106; i<206; i++){
            axios
                .post(apiUrl+"/api/part/parttobatch", {"partId": i, "batchId": 4})
                .then(function(result){
                    console.log(result)
                })
        }
    }

    return (
        <div>
            <button onClick={addParts}>add 100 parts</button>
            <button onClick={partsToBatch}>add parts to batch</button>
        </div>
    )
}

export default Testing;