import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {MenuItem, Button} from '@material-ui/core'

const NewPart = (props) => {
    const [partObj, setPartObj] = useState({"projectId": props.projectId})

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios
            .post(apiUrl+"/api/part/insertpart", {"partobj":partObj})
            .then(function(result){
                console.log(result)
            })
        console.log(partObj)
    }
    const handleChange = (e) =>{
        const obj1 = {[e.target.name]: e.target.value};
        setPartObj(
            Object.assign({},partObj,obj1)
        )
        console.log(partObj)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="partName" onChange={handleChange} placeholder="part name"/>
                <input name="outsideDiameter" onChange={handleChange}  placeholder="outside d"/>
                <input name="insideDiameter" onChange={handleChange}  placeholder="inside d"/>
                <input name="partLength" onChange={handleChange}  placeholder="part length"/>

                <input name="outsideChamfer" onChange={handleChange}  placeholder="outside c"/>
                <input name="outsideChamferType" type="radio" value="chamfer" onChange={handleChange}/><label>chamfer</label>
                <input name="outSideChamferType" type="radio" value="radius"  onChange={handleChange}/><label>radius</label>

                <input name="insideChamfer" onChange={handleChange}  placeholder="inside c"/>
                <input name="insideChamferType" type="radio" value="chamfer" onChange={handleChange}/><label>chamfer</label>
                <input name="insideChamferType" type="radio" value="radius"  onChange={handleChange}/><label>radius</label>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default NewPart;