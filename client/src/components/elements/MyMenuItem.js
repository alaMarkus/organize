import React, {useState} from 'react'
import './mymenuitem.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const MyMenuItem = (props) =>{
    const [fade, setFade] = useState("")

    const handleClick = (e) =>{
        props.onClick(e)
        if(e.target.id!==""){
            setFade("animate")
            setTimeout(function(){
                setFade("")
            },400)
        }
    }

    const DeleteIcon = () =>{
        if (props.delete==="show"){
            return (
                <DeleteForeverIcon className="icon" onClick={props.onDeleteClick}/>
            )
        }else{
            return null;
        }
    }
    return (
        <div id={props.id} className={[fade ? "animate" : "menu-container"] +[props.selected ? " selected" : ""]}  onClick={handleClick}>
            {props.text}
            <DeleteIcon />
        </div>
    )
}


export default MyMenuItem;