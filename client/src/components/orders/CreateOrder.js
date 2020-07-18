import React from 'react'
import OrderBatchMenu from './OrderBatchMenu'

const CreateOrder = (props) => {
    return (
        <div className="create-order-container">
            <div className="choose-batch">Choose Batch to Order</div>
            <div className="create-batch-menu-container">
                <OrderBatchMenu />
            </div>
        </div>
    )
}

export default CreateOrder;