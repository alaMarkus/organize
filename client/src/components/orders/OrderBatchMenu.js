import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {apiUrl} from '../../config/config'
import  {MenuItem, Button} from '@material-ui/core'
import './OrderBatchMenu.css'

import BatchContent from './BatchContent'
import MyMenuItem from '../elements/MyMenuItem'

const OrderBatchMenu = (props)=> {
    const [batchList, setBatchList] = useState([])
    const [selectedBatch, setSelectedBatch] = useState(1)
    const [reRender, reRenderCause] = useState("")

    useEffect(()=>{
        axios
        .post(apiUrl+"/api/part/getBatches")
        .then(function(result){
            console.log(result.data)
            setBatchList(result.data)
        })
    },[reRender])

    const clickedBatch =(e) =>{
        console.log(e.currentTarget.id)
        console.log(e.target.id)
        if(e.currentTarget.id===e.target.id){
            setSelectedBatch(e.target.id)
        }
    }


    const deleteBatch = (e) =>{
        const batchToDelete = e.currentTarget.dataset.myid
        console.log("currentTarget:")
        console.log(batchToDelete)
        let confirmed = window.confirm("delete batch and its contents?")
        if (confirmed){
            axios
            .post(apiUrl+"/api/part/deletebatch", {"batchId": batchToDelete})
            .then(function(result){
                console.log(result.data)
                setSelectedBatch(1)
                reRenderCause(result.data+batchToDelete)
                console.log("rerender:")
                console.log(reRender)
            })
        }
    }

    const submitOrder = () =>{
        axios
            .post(apiUrl+"/api/order/createorder", {"batchId": selectedBatch})
            .then(function(result){
                console.log(result.data)
            })
    }

    const chooseMachine = () => {
        axios
            .post(apiUrl+"/api/match",{"batchId": 1})
            .then(function(result){
                console.log(result.data)
            })
    }

    return (
        <div className="orders-batch-container" >
            <div className="menus-container">
                <div className="orders-batch-menu-container">
                    <div className="orders-batch-list">
                        <div className="orders-batch-header-container">
                        </div>
                        {batchList.map(e=>{
                            return (
                                    <MyMenuItem className="menu-item" selected={selectedBatch==e.batchId} key={e.batchId} id={e.batchId} onClick={clickedBatch} text ={e.batchName} myid={e.batchId}/>
                            )
                        })}
                    </div>
                    <div className = "order-parts-container">
                        <BatchContent selectedBatch = {selectedBatch}/>
                        <div className="order-button-container">
                            <button className="order-button plain-button"  onClick={submitOrder}>Create Order</button>
                            <button className="order-button plain-button"  onClick={chooseMachine}>Choose machine</button>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    )
}


export default OrderBatchMenu;