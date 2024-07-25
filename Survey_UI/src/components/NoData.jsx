import React from 'react'

const NoData = ({msg}) => {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "200px" }} >
            <h6 style={{ fontSize: "20px", fontWeight: "400" }} >{msg}</h6>
        </div>
    )
}

export default NoData