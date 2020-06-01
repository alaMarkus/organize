import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem} from '@material-ui/core'

import './partdata.css'

const PartData = (props)=>{
    const [partData, setPartData] = useState([])

    useEffect(()=>{
        axios
            .post(apiUrl+"/api/part/getpart",{"partId": props.partId})
            .then(function(result){
                console.log(result.data)
                setPartData(result.data)
            })
    },[props.partId])

    return (
        partData.map(e=>{
            return (
                <div className="part-data">
                    <h3 className="part-header">{e.partName}</h3>
                    <table>
                        <tr>
                            <th>Outside diameter: </th>
                            <td>{e.outsideDiameter}</td>
                        </tr>
                        <tr>
                            <th>Inside diameter</th>
                            <td>{e.insideDiameter}</td>
                        </tr>
                        <tr>
                            <th>Length</th>
                            <td>{e.bushingLength}</td>
                        </tr>
                        <tr>
                            <th>Outside chamfer</th>
                            <td>{e.outsideChamfer}</td>
                            <th>type</th>
                            <td>{e.outsideChamferType}</td>
                        </tr>
                        <tr>
                            <th>inside Chamfer</th>
                            <td>{e.insideChamfer}</td>
                            <th>type</th>
                            <td>{e.insideChamferType}</td>
                        </tr>
                    </table>
                </div>
            )
        })
    )
}

export default PartData