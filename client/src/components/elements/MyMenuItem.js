import React, {useState} from 'react'
import './mymenuitem.css'

const MyMenuItem = (props) =>{
    const [fade, setFade] = useState("")

    const handleClick = (e) =>{
        props.onClick(e)
        setFade("animate")
        setTimeout(function(){
            setFade("")
        },400)
    }

    return (
        <div id={props.id} className={[fade ? "animate" : "menu-container"] +[props.selected ? " selected" : ""]}  onClick={handleClick}>
            {props.text}
            <div className="circle"></div>
        </div>
    )
}


export default MyMenuItem;