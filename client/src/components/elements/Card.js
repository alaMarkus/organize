import React from 'react'
import './card.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Card = (props) =>{

    const DeleteIcon = () =>{
        if (props.delete==="Done"){
            return (
                <DeleteForeverIcon className="part-icon" onClick={props.onDeleteClick} data-myid={props.myid}/>
            )
        }else{
            return null;
        }
    }

    return (
        <div className="card-container">
            <div className="card-header">{props.text}</div>
            {props.children}
            <DeleteIcon />
        </div>
    )
}

export default Card;