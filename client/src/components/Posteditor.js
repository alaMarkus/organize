import React, {useState,useEffect} from 'react';
import "./Posteditor.css"
import outsidetool from './static/outsidetool.png'
import cuttingtool from './static/cuttingtool.png'
import insidetool from './static/insidetool.png'

const Posteditor = () =>{
    const [numberOfBoxes, addBox] = useState(10);
    const [line, setLine] = useState({});
    const [focused, holdFocused] = useState({});
    const [showTool, setTool] = useState("all")
    const refs = []

    useEffect(()=>{
        console.log("did mount")
        refs[0].focus()
        holdFocused(refs[0])
    },[])

    const add = () =>{
        const boxArr = []
        for (let i = 0; i<numberOfBoxes; i++){
            boxArr.push("input"+i)
        }
        return boxArr;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(line)
    }

    const handleChange = (e)=>{
        const inputNumber = e.target.name
        const inputValue = e.target.value
        const obj = {[inputNumber]: inputValue}
        setLine(Object.assign({}, line, obj))
        console.log(inputNumber)
        console.log(inputValue)
    }
    const handleClick = (e) => {
        console.log("clicked")
        console.log(e.target)
        holdFocused(e.target)
    }

    const handleKeyDown = (event)=> {
        if(event.keyCode === 13) {
            if(event.target.nextSibling.type==="submit"){
                addBox(numberOfBoxes+1)
            }
            console.log('Enter key pressed')
            if(event.target.nextSibling!=null&&event.target.nextSibling.type!=="submit"){
                if (event.target.nextSibling.value!==""){
                    console.log("not empty")
                }
                event.target.nextSibling.focus()
                holdFocused(event.target.nextSibling)
            }
        }
        if(event.keyCode === 40) { 
            if(event.target.nextSibling!=null&&event.target.nextSibling.type!=="submit"){
                event.target.nextSibling.focus()
                holdFocused(event.target.nextSibling)
            }
            console.log('arrow down key pressed')
        }
        if(event.keyCode === 38) {
            if(event.target.previousSibling!=null){ 
                event.target.previousSibling.focus()
                holdFocused(event.target.previousSibling)
            }
            console.log('arrow up key pressed')
        }
        if(event.keyCode === 8) {
            if (event.target.value===""){
                if(event.target.previousSibling!=null){ 
                    event.target.previousSibling.focus()
                    holdFocused(event.target.previousSibling)
                }
            }
        }   
    }

    const handleButtons = (e) =>{
        console.log(e.target.name)
        console.log(focused.name)
        focused.value = focused.value + e.target.name
        focused.focus()
        const inputNumber = focused.name
        const inputValue = focused.value
        const obj = {[inputNumber]: inputValue}
        setLine(Object.assign({}, line, obj))
    }

    const hovering = (e) =>{
        console.log("hover")
        console.log(e.target.alt)
        setTool(e.target.alt)
    }
    const exit = ()=>{
        console.log("exit")
        setTool("all")
    }
    const toolsClick = (e) =>{
        setTool(e.target.name)
    }

    const Tools = (props)=>{
        console.log(props.select)
        const selectFunc = (asd)=>{
            if (asd==="outsidetool"){
                return <img  className="outside-tool" alt="outsidetool" src={outsidetool} width={60} onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            if (asd==="outsidetool2"){
                return <img  className="outside-tool2" alt="outsidetool2" src={outsidetool} width={60}onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            if (asd==="outsidetool3"){
                return <img  className="outside-tool3" alt="outsidetool3" src={outsidetool} width={60}onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            if (asd==="cuttingtool"){
                return <img  className="cutting-tool" alt="cuttingtool" src={cuttingtool} width={50} onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            if(asd==="cuttingtool2"){
                return <img  className="cutting-tool2" alt="cuttingtool2" src={cuttingtool} width={50}onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            if (asd==="insidetool"){
                return <img  className="inside-tool" alt="insidetool" src={insidetool} width={150}onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            if (asd==="insidetool2"){
                return <img  className="inside-tool2" alt="insidetool2" src={insidetool} width={150}onMouseEnter={hovering} onMouseLeave={exit}/>
            }
            
            if (asd==='all'){
                const style = {opacity:"0.3"}
                return (
                    <div className="imgs-container">
                        <img style={style} className="outside-tool" alt="outsidetool" src={outsidetool} width={60}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="cutting-tool" alt="cuttingtool" src={cuttingtool} width={50}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="cutting-tool2" alt="cuttingtool2" src={cuttingtool} width={50}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="inside-tool" alt="insidetool" src={insidetool} width={150}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="inside-tool2" alt="insidetool2" src={insidetool} width={150}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="outside-tool2" alt="outsidetool2" src={outsidetool} width={60}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="outside-tool3" alt="outsidetool3" src={outsidetool} width={60}onMouseOver={hovering} onMouseLeave={exit}/>
                    </div>
                )
            }
            if (asd==='outside'){
                const style = {opacity:"0.3"}
                return (
                    <div className="imgs-container">
                        <img style={style} className="outside-tool" alt="outsidetool" src={outsidetool} width={60}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="outside-tool2" alt="outsidetool2" src={outsidetool} width={60}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="outside-tool3" alt="outsidetool3" src={outsidetool} width={60}onMouseOver={hovering} onMouseLeave={exit}/>
                    </div>
                )
            }
            if (asd==='inside'){
                const style = {opacity:"0.3"}
                return (
                    <div className="imgs-container">
                        <img style={style} className="inside-tool" alt="insidetool" src={insidetool} width={150}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="inside-tool2" alt="insidetool2" src={insidetool} width={150}onMouseOver={hovering} onMouseLeave={exit}/>
                    </div>
                )
            }
            if (asd==='cutting'){
                const style = {opacity:"0.3"}
                return (
                    <div className="imgs-container">
                        <img style={style} className="cutting-tool" alt="cuttingtool" src={cuttingtool} width={50}onMouseOver={hovering} onMouseLeave={exit}/>
                        <img style={style} className="cutting-tool2" alt="cuttingtool2" src={cuttingtool} width={50}onMouseOver={hovering} onMouseLeave={exit}/>
                    </div>
                )
            }
        }
        return (
            <div className = "buttons-container">
                {selectFunc(props.select)}
            </div>
        )
    }

    return (
        <div className="post-editor">
            <div className = "inputs-container">
                <form onSubmit={handleSubmit} autoComplete="off">{
                    add().map((e,index)=>{
                        return (
                            <input ref={ref=>refs[index] = ref} value={line.e} key={e} className = {e} name = {e} onKeyDown={handleKeyDown} onChange={handleChange} onClick = {handleClick}/>
                        )
                    })
                }
                    <input className = "submitpost" type="submit"/>
                </form>
            </div>
                <div className="controls-container">
                    <button name="outside" onClick={toolsClick}>outside</button>
                    <button name="inside" onClick={toolsClick}>inside</button>
                    <button name ="cutting" onClick={toolsClick}>cutting</button>
                    <Tools select={showTool}/>
                </div>
            </div>
    )
}

export default Posteditor