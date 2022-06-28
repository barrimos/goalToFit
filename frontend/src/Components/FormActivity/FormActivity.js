import React, { useEffect, useState } from 'react';
import { classifierActivity } from '../../utils/classifileActivity';
import { minToHour } from '../../utils/minToHour';
import './FormActivity.css';

function FormActivity(props){
    const [startTime, setStartTime] = useState(props.data[0][0].startTime);
    const [getDate, setGetDate] = useState(props.data[0][0].atDate);
    const [duration, setDuration] = useState(props.data[0][0].duration);
    const [description, setDescription] = useState(props.data[0][0].description);
    const [quantityDone, setQuantityDone] = useState();
    const [quantityGoal, setQuantityGoal] = useState(props.data[0][0].quantity.goal);
    
    const [focused, setFocused] = useState(false);
    const [displayDuration, setDisplayDuration] = useState('' || minToHour(duration));
    const [displayQuantityGoal, setDisplayQuantityGoal] = useState('' || classifierActivity(quantityGoal, props.data[0][0].quantity.classifier, 2));

    // console.log(startTime);
    // console.log(getDate);
    // console.log(duration);
    // console.log(description);
    // console.log(quantityDone);
    // console.log(quantityGoal);
    // console.log(displayDuration);
    // console.log(displayQuantityGoal);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

        const getStartTime = (e) => {
        setStartTime(e.target.value);
    }
    const getDMY = (e) => {
        setGetDate(e.target.value);
    }
    const getDuration = (e) => {
        let value = Number(e.target.value);
        let max = Number(e.target.max);
        setDuration(value > max ? max : value);

        let displayDuration = minToHour(value > max ? max : value);
        setDisplayDuration(displayDuration);
    }
    const getDescribe = (e) => {
        setDescription(e.target.value);
    }
    
    const getQuantity = (e) => {
        if(e.target.value === '0'){
            return;
        } else {
            setQuantityGoal(Number(e.target.value));
        }

        let displayQuantity = classifierActivity(e.target.value, props.data[0][0].quantity.classifier, 2);
        setDisplayQuantityGoal(displayQuantity);
    }


    const onFocus = () => {
        setFocused(true);
    };
    const onBlur = () => {
        setFocused(false);
    };


    const newData = (new_getDate, new_startTime, new_duration, new_qualtityDone, new_quantityGoal, new_description) => {
        let updateData = {
            quantity: {
                done: new_qualtityDone,
                goal: new_quantityGoal,
            },
            startTime: new_startTime,
            duration: new_duration,
            description: new_description,
            atDate: new_getDate
        };
        props.getNewData(updateData);
    }

    newData(
        getDate || props.data[0][0].atDate,
        startTime || props.data[0][0].startTime,
        duration || props.data[0][0].duration,
        quantityDone || props.data[0][0].quantity.done,
        quantityGoal || props.data[0][0].quantity.goal,
        description || props.data[0][0].description);

    return(
        <form className='settingInfo'>
            <label htmlFor={`getDate`}>Date</label>
            <input type='date' className='getDate' id={`getDate`} value={getDate || props.data[0][0].atDate} min='2022-01-01' max={today} onChange={e => getDMY(e)}/>

            <label htmlFor={`startTime`}>Start Time</label>
            <input type='time' className='startTime' id={`startTime`} value={startTime || ''} onChange={e => getStartTime(e)}/>

            <label htmlFor={`duration`}>Duration</label>
            {focused ?
                <input type='number' className='duration' id={`duration`} value={duration || ''} min='1' max='1440' placeholder='min' onBlur={onBlur} onChange={e => getDuration(e)}/>
                :
                <input type='text' className='duration' id={`duration`} value={displayDuration || ''} placeholder='min' onFocus={onFocus}/>
            }

            <label htmlFor={`quantity-done`}>Quantity</label>
            {focused ?
                <input type='number' className='quantity-goal' id={`quantity-goal`} value={quantityGoal || ''} min='1' placeholder='goal (reps or metres)' onBlur={onBlur} onChange={e => getQuantity(e)}/>
                :
                <input type='text' className='quantity-goal' id={`quantity-goal`} value={displayQuantityGoal || ''} placeholder='goal (reps or metres)' onFocus={onFocus}/>
            }
            
            <label htmlFor={`description`}>Description</label>
            <input type='text' className='description' id={`description`} value={description || ''} maxLength='60' placeholder='max 60 letters' onChange={e => getDescribe(e)}/>
        </form>
    )
}

export default FormActivity;