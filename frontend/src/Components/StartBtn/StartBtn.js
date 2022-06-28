import React, { useState, useEffect } from "react";
import './StartBtn.css';

function StartBtn(props){
    const [ready, setReady] = useState(false);
    const readyBtn = document.querySelectorAll('.btnStartWorkout');
    const pressReady = () => {
        for(let i = 0; i < readyBtn.length; i++){
            if(ready){
                readyBtn[i].removeAttribute('disabled');
                readyBtn[i].classList.add('active');
            } else {
                readyBtn[i].setAttribute('disabled', '');
                readyBtn[i].classList.remove('active');
            }
        }
    }

    useEffect(() => {
        setReady(props.isReady);
        pressReady();
    })

    return(
        <div className={`${props.showOnTop ? props.showOnTop : 'd-none'} d-md-flex justify-content-md-center align-items-md-center col-md-4 ${props.inTopNav ? props.inTopNav : ''} col-lg-12`} id={`pressButton ${props.heightAtTop ? props.heightAtTop : ''}`}>
            <button className={`btnStartWorkout ${props.widthAtTop ? props.widthAtTop : ''}`} onClick={props.pressStart}>{ready ? 'READY' : 'NOT READY'}</button>
        </div>
    )
}

export default StartBtn;