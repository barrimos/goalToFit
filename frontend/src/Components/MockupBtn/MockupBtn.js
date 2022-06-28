import React from "react";
import './MockupBtn.css';

function MockupBtn(props){
    return(
        <div className={`mockup ${props.clearHeight ? props.clearHeight : ''}`}>
            <div className={`col-4 ${props.clearPadding ? props.clearPadding : ''}`} id='m1'>
                <div className='mockupItem'>
                    <div className={`mockupSlot ${props.setWH ? props.setWH : ''}`}>No.1</div>
                </div>
            </div>
            <div className={`col-4 ${props.clearPadding ? props.clearPadding : ''}`} id='m2'>
                <div className='mockupItem'>
                    <div className={`mockupSlot ${props.setWH ? props.setWH : ''}`}>No.2</div>
                </div>
            </div>
            <div className={`col-4 ${props.clearPadding ? props.clearPadding : ''}`} id='m3'>
                <div className='mockupItem'>
                    <div className={`mockupSlot ${props.setWH ? props.setWH : ''}`}>No.3</div>
                </div>
            </div>
        </div>
    )
}

export default MockupBtn;