import React, {useState,useEffect} from 'react';
import "./Posteditor.css"
import outsidetool from './static/outsidetool.png'
import cuttingtool from './static/cuttingtool.png'
import insidetool from './static/insidetool.png'

const Posteditor = () =>{
    const [numberOfBoxes, addBox] = useState(10);
    const [line, setLine] = useState({});
    const [focused, holdFocused] = useState({});
    const [toolPos, setToolPos] = useState("none");
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
        console.log(e.target.className)
        console.log(focused.name)
        focused.value = focused.value + e.target.className
        focused.focus()
        const inputNumber = focused.name
        const inputValue = focused.value
        const obj = {[inputNumber]: inputValue}
        setLine(Object.assign({}, line, obj))
    }

    const showTool = (e) =>{
        console.log(e.target.className)
        setToolPos(e.target.className)
    }
    const hideTool = ()=>{
        setToolPos("none")
    }

    const Tool = (props) =>{
        console.log(props.pos)
        if (props.pos==="chamferStart"){
            return (
                <div>
                    <img src={outsidetool} width={60} className={props.pos+"Tool"}/>
                </div>
            )
        }
        if (props.pos==="chamferEnd"){
            return (
                <div>
                    <img src={outsidetool} width={60} className={props.pos+"Tool"}/>
                </div>
            )
        }
        return (
            <div>
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
                    <div className ="buttons-container">
                        <Tool pos={toolPos}/>
                        <span title ="X(partOD-outsideChamfer) Z0" className="chamferStart" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(partOD) Z(-outsideChamfer)" className="chamferEnd" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(partOD) Z(-partLength+rearChamfer)" className="rearChamferStart" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(partOD-rearChamfer) Z(-partLength)" className="rearChamferEnd" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(stock OD-OutsideChamfer) Z (geomteryApproachZ)" className="geometryApproach" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(stock OD + facingApproachX) Z0" className="facingStartingPosition" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(stock ID + facingFinalDepth) Z0" className="facingCutDepth" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                        <span title ="X(stock OD + outsideRetractZ) Z(outsideRetractZ)" className="outsideRetract" onClick={handleButtons} onMouseOver={showTool} onMouseLeave={hideTool}></span>
                    </div>
                </div>
            </div>
    )
}

export default Posteditor