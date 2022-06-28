import React from "react";
import './SwitchTypeButton.css';

function SwitchTypeButton(props){

    return(
        <div className={props.class === 'none' ? 'd-block d-md-none col-12 mx-auto' : 'd-none d-md-block col-md-6 col-lg-8 mx-auto'} id='switch-in-out'>
            <div className='switch-in-out-btn'>
                <label htmlFor='checkbox-indoor' className='label-switch-indoor' onClick={props.typeClick}>Indoor</label>
                <input type='radio' name='checkbox-in-all-out' id='checkbox-indoor' className='checkbox-indoor' value='indoor'/>
                <label htmlFor='checkbox-all' className='label-switch-all active' onClick={props.typeClick}>All</label>
                <input type='radio' name='checkbox-in-all-out' id='checkbox-all' className='checkbox-all' value='all' checked/>
                <label htmlFor='checkbox-outdoor' className='label-switch-outdoor' onClick={props.typeClick}>Outdoor</label>
                <input type='radio' name='checkbox-in-all-out' id='checkbox-outdoor' className='checkbox-outdoor' value='outdoor'/>
            </div>
        </div>
    )
}

export default SwitchTypeButton;