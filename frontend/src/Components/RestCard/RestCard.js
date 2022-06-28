import React , { useCallback }from "react";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './RestCard.css';

function RestCard(props){

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/create', {replace: true}), [navigate]);
    const newActivity = () => {
        handleOnClick();
    }

    return(
        <div className='restCard text-center'>
            <h6 className='restH6'>Rest day ?</h6>
            <i className='fa fa-circle-plus plusBtn' onClick={props.newActivity || newActivity}></i>
            <img src='../../../img/rest.png' className='imageActivity'/>
        </div>
    )
}

export default RestCard;