import React from 'react';
import './SwitchShowButton.css';

function SwitchShowButton(props){

    return(
        <div className='d-flex align-items-center'>
            {/* <label htmlFor='switch' className='labelName'>Mode {props.viewGroup ? 'card' : 'slide'}</label> */}
            <div className='SwitchGroupCard'>
                <input type='checkbox' id='switch' className='swt-icon-btn' name='switchShowCard' onClick={props.switchView}/>
                <label htmlFor='switch'>
                    <div className='iconSwitch'></div>
                </label>
            </div>
        </div>
    )
}

export default SwitchShowButton;