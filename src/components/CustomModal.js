import React from "react";

const CustomModal = ({ title = "Error?", message = "" , onCancel = () => {}, onConfirm = ()=> {}}) => {

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000"
        }}>
            <div style={{
                width: "70%",
                padding: "10px",
                backgroundColor: "pink",
                borderRadius: "10px"
            }} >
                <h1 className="text-center">{title}</h1>
                <p className="text-center">{message}</p>
                <div className="d-flex gap-4 justify-content-center" >
                    <button 
                    className="btn btn-warning" 
                    style={{ fontSize: "1.2rem"}}
                    onClick = {onCancel}>Back</button>

                    <button 
                    className="btn btn-danger" 
                    style={{ fontSize: "1.2rem"}}
                    onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    )

}

export default CustomModal