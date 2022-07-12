import React, { useEffect } from "react";
import './Button.css';

function Button(props){

 
    let bool = props.fullfill ?? props.isAllChecked ?? props.isAgreedRegis;


    const handleOnClick = (e) => {
        e.preventDefault();
        if(e.target.name === 'Cancel'){
            props.action();
        }
        if(!bool){
            return;
        } else {
            props.action();
        }
    }

    useEffect(() => {
        const buttonAuthen = document.querySelector('.respond');
        if(props.classBtn === 'authenBtn'){
            return;
        }

        if(props.isAllChecked || props.isAgreedRegis){
            buttonAuthen.classList.remove('disabled');
            buttonAuthen.removeAttribute('disabled');
        } else {
            buttonAuthen.classList.add('disabled');
            buttonAuthen.setAttribute('disabled', '');
        }


    }, [props.isAllChecked, props.isAgreedRegis])


    return(
        <button type='submit' name={props.text} className={`respond ${props.classBtn}`} onClick={bool === false ? undefined : (e) => handleOnClick(e)}>
            {props.text}
        </button>
    )
}

export default Button;