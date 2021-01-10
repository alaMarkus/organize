import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'
import "./Testing.css"

const Testing = () => {
    const [ncData,setNcData] = useState("")
    const [keyData, setKeyData] = useState([])


    useEffect(()=>{
        showdata()
    },[])

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

    const showdata = () =>{
        axios
            .post(apiUrl+"/test/showncfiles")
            .then(function(response){
                console.log(response.data)
                setNcData(response.data)
                let keyArr = []
                Object.keys(response.data).map(key => {
                    keyArr.push(key)
                })
                setKeyData(keyArr)
            })
    }

    function NewlineText(asd) {
        const newText = asd.split('\n').map(str => <p>{str}</p>);
        return newText;
      }

    return (
        <div>
            <div>{/*
                <button onClick={addParts}>add 100 parts</button>
                <button onClick={partsToBatch}>add parts to batch</button>
                <button onClick={showdata}>show nc data</button>*/}
            </div>
            <div>
                <div>
                    <div>
                        {keyData.map(e=>{
                            return(
                                <div>
                                    <div className="nc-file-name" key={e}>
                                        {e}
                                    </div>
                                    <div className="nc-line">
                                            {NewlineText(ncData[e])}
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Testing;