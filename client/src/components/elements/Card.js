import React from 'react'
import './card.css'

const Card = (props) =>{
    return (
        <div className="card-container">
            <div className="card-header">{props.text}</div>
            {props.children}
        </div>
    )
}

export default Card;