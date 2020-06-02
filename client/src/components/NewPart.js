import React, {useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../config/config'
import {Button} from '@material-ui/core'
import './newpart.css'

const NewPart = (props) => {
    const [partObj, setPartObj] = useState({"projectId": props.projectId, "outsideChamferType": "chamfer", "insideChamferType": "chamfer"})

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios
            .post(apiUrl+"/api/part/insertpart", {"partobj":partObj})
            .then(function(result){
                console.log(result)
                props.updatePartList(partObj)
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
        <div className="new-part-container">
            <form onSubmit={handleSubmit}>
                <input className ="part-name" name="partName" onChange={handleChange} required autoComplete="off" placeholder="part name"/>
                <input className ="part-length" name="partLength" onChange={handleChange}  required autoComplete="off" placeholder="part length"/>
                <input className = "outside-diameter" name="outsideDiameter" onChange={handleChange}  required autoComplete="off" placeholder="outside diameter"/>
                <input className = "inside-diameter" name="insideDiameter" onChange={handleChange}  required autoComplete="off" placeholder="inside diameter"/>

                <input className = "outside-chamfer" name="outsideChamfer" onChange={handleChange}  required autoComplete="off" placeholder="outside chamfer"/>
                <div className="outside-radio-container">
                    <input  name="outsideChamferType" type="radio" value="chamfer" onChange={handleChange} checked={partObj.outsideChamferType==="chamfer"}/><label>chamfer</label>
                    <input  name="outsideChamferType" type="radio" value="radius"  onChange={handleChange}/><label>radius</label>
                </div>

                <input className="inside-chamfer" name="insideChamfer" onChange={handleChange}  required autoComplete="off" placeholder="inside chamfer"/>
                <div className="inside-radio-container">
                    <input  name="insideChamferType" type="radio" value="chamfer" onChange={handleChange} checked={partObj.insideChamferType==="chamfer"}/><label>chamfer</label>
                    <input  name="insideChamferType" type="radio" value="radius"  onChange={handleChange}/><label>radius</label>
                </div>

                <Button variant="contained" color="primary" className="submit-button" type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default NewPart;