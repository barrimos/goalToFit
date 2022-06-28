import React from "react";

function ContentInModal(props){

    return(
        <div className='modalContent'>
            <div className='row d-flex align-items-center justify-content-between'>
                <span className='col-6'>
                    <div>Item No. {props.ItemNumber}</div>
                    <div>{props.activityName}</div>
                </span>
                <div className='col-6'>
                    <img className='modalImage' src={`../../../img/${props.activityName}.png`} alt={props.activityName}/>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default ContentInModal;