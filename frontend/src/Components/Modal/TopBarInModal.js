import React from "react";

function TopBarInModal(props){

    return(
        <div className='modalTop'>
            <h5>{props.header}</h5>
            <button className='closeModal' onClick={props.closeButton}><i className='fa fa-x'></i></button>
        </div>
    )
}

export default TopBarInModal;