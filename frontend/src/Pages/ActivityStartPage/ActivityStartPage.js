import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './dist/ActivityStartPage.css';
import Template from '../../Components/Template/Template';
import axios from 'axios';
import SwitchShowButton from '../../Components/SwitchShowButton/SwitchShowButton';
import RestCard from '../../Components/RestCard/RestCard';
import { classifierActivity } from '../../utils/classifileActivity';
import { minToHour } from '../../utils/minToHour';
import config from '../../config';
import { today } from '../../utils/getToday';
import Reloading from '../../Components/Reloading/Reloading';

function ActivityStartPage(){
    let _this = today();
    let todays = _this.year + '-' + _this.month + '-' + _this.day;

    const [startTime, setStartTime] = useState([]);
    const [getDate, setGetDate] = useState([]);
    const [duration, setDuration] = useState([]);
    const [description, setDescription] = useState([]);
    const [quantityGoal, setQuantityGoal] = useState([]);
    
    const [focused, setFocused] = useState([false, false, false]);
    const [displayDuration, setDisplayDuration] = useState([]);
    const [displayQuantityGoal, setDisplayQuantityGoal] = useState([]);

    const [numItem, setNumItems] = useState(0);
    const [isDelete, setIsDelete] = useState(false);

    const [startAc, setStartAc] = useState([]);

    const [isGroup, setIsGroup] = useState(false);
    
    const [emptySlot, setEmptySlot] = useState([]);

    const [isWaiting, setIsWaiting] = useState(true);


    // console.log(startTime);
    // console.log(getDate);
    // console.log(duration);
    // console.log(description);
    // console.log(quantity);
    // console.log(displayDuration);
    // console.log(displayQuantityGoal);
    // console.log(startAc)

    const saveActivityToDB = async (e, index) => {
        e.preventDefault();
        let exerciseLen;
        await axios.get(`${config.vercel}report/records`)
            .then(res => {
                if(res.data.length === 0){
                    exerciseLen = 0;
                } else {
                    exerciseLen = res.data[res.data.length - 1].id;
                }
            })
            .catch(err => alert('Error: ' + err))

        let data = {
            id: exerciseLen + 1,
            name: startAc[index][0],
            type: startAc[index][1],
            quantity: {
                done: 0,
                goal: Number(quantityGoal[index]) || 0,
                classifier: startAc[index][2]
            },
            startTime: startTime[index] || '00:00',
            duration: Number(duration[index]) || 0,
            calories: 0,
            description: description[index] || '',
            atDate: getDate[index] || todays
        }
        // console.log(data);
        await axios.post(`${config.vercel}start/activity`, data)
            .then(res => alert('Activities Save'))
            .then(() => {
                deleteCardActivity(e, index);
            })
            .catch(err => alert('Activities Save failed: ' + err))
    }


    useEffect(() => {
        let activities = JSON.parse(sessionStorage.getItem('setUserSelect'))
        if(activities === '' || activities === null){
            sessionStorage.removeItem('setUserSelect');
            return;
        } else {
            setStartAc(activities);
            if(emptySlot.length + activities.length !== 3){
                emptySlot.push('empty');
            }
            setIsDelete(false);
        }
    }, [isDelete, emptySlot.length])

    const setGroupDisplay = () => {
        if(isGroup === true){
            setIsGroup(false);
        } else {
            setIsGroup(true);
        }
    }


    let indexItem = numItem;
    const activitiesLen = startAc.length - 1;
    const handleSlideCardActivity = (e) => {
        if(e.target.attributes[1].value === 'next'){
            next();
        }
        if(e.target.attributes[1].value === 'prev'){
            prev();
        }
    }

    const prev = () => {
        if(numItem <= 0){
            indexItem = activitiesLen;
            setNumItems(indexItem);
        } else {
            indexItem -= 1;
            setNumItems(indexItem);
        }
    }

    const next = () => {
        if(numItem >= activitiesLen){
            indexItem = 0;
            setNumItems(indexItem);
        } else {
            indexItem += 1;
            setNumItems(indexItem);
        }
    }

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/create', {replace: true}), [navigate]);
    const newActivity = () => {
        handleOnClick();
    }


    const deleteCardActivity = (e, index) => {
        e.preventDefault();
        if(e.which === 13 || e.which == '13'){
            e.preventDefault();
        }
        // when press save_btn or delete_btn so delete from sessionStorage
        let activities = JSON.parse(sessionStorage.getItem('setUserSelect'));
        activities.splice(index, 1);
        // when press save_btn or delete_btn so delete in state too
        startTime.splice(index, 1);
        getDate.splice(index, 1);
        duration.splice(index, 1);
        description.splice(index, 1);
        quantityGoal.splice(index, 1);
        displayDuration.splice(index, 1);
        displayQuantityGoal.splice(index, 1);
        setIsDelete(true);
        sessionStorage.setItem('setUserSelect', JSON.stringify(activities));
    }


    const getStartTime = (e, i) => {
        startTime[i] = e.target.value;
        setStartTime([...startTime]);
    }
    const getDMY = (e, i) => {
        getDate[i] = e.target.value;
        setGetDate([...getDate]);
    }
    const getDuration = (e, i) => {
        let value = Number(e.target.value);
        let max = Number(e.target.max);
        duration[i] = value > max ? max : value;
        setDuration([...duration]);

        displayDuration[i] = minToHour(duration[i]);
        setDisplayDuration([...displayDuration]);
    }

    const getDescribe = (e, i) => {
        description[i] = e.target.value;
        setDescription([...description]);
    }
    
    const getQuantity = (e, i) => {
        if(e.target.value === '0'){
            return;
        } else {
            quantityGoal[i] = e.target.value;
        }

        setQuantityGoal([...quantityGoal]);

        displayQuantityGoal[i] = classifierActivity(quantityGoal[i], startAc[i][2], 1);
        setDisplayQuantityGoal([...displayQuantityGoal]);
    }

    const onFocus = (i) => {
        focused[i] = true;
        setFocused([...focused]);
    };
    const onBlur = (i) => {
        focused[i] = false;
        setFocused([...focused]);
    };


    useEffect(() => {
        setTimeout(() => {
            setIsWaiting(false);
        }, 1000)
    }, [startAc])

    return(
        <>
            {isWaiting ?
                <Reloading/>
                :
                <Template titleHead='Activity Start' showNav={false} readyButton={false}>
                    <section className='current_activity'>
                        <div className='container'>
                            <div className='row d-block d-sm-flex my-lg-5'>
                                {startAc.length === 0 ?
                                    ''
                                    :
                                    <div className='col-12 mb-3 d-flex justify-content-between subHead'>
                                        <h6 className='primary-text-color'>Setting items</h6>
                                        <SwitchShowButton switchView={setGroupDisplay} viewGroup={isGroup}/>
                                    </div>
                                }
                                {/* <!------------------------------- START COLUMN HERE -------------------------------> */}
                                
                                {startAc.length === 0 ?
                                    <div className='col-12 col-lg-9 mx-auto'>
                                        <div className='cardAc withRest'>
                                            {/* <div className='restCard text-center'>
                                                <h6 className='restH6'>Rest day ?</h6>
                                                <i className='fa fa-circle-plus plusBtn' onClick={newActivity}></i>
                                                <img src='../../../img/rest.png' className='imageActivity'/>
                                            </div> */}
                                            <RestCard newActivity={newActivity}/>
                                        </div>
                                    </div>
                                    :
                                    <div className='col-12 cardAcContainer'>
                                        <div className='row'>
                                            <div className={`col-12 col-md-10 mx-md-auto ${startAc.length === 0 ? 'col-lg-9 mx-lg-auto' : (isGroup ? 'col-lg-11' : 'col-lg-4 mx-lg-0')}`}>
                                                {isGroup ?
                                                    <div className='row d-flex justify-content-center justify-content-md-start align-items-center'>
                                                        {startAc.map((activity, i) => (
                                                            <div className='col-12 col-md-6 col-lg-4' key={i}>
                                                                <div className='cardAc' key={i}>
                                                                    <div className='d-flex justify-content-between align-items-center card-top'>
                                                                        <div className='button-handle-activity'>
                                                                            <button className='btn-handle-delete' onClick={(e) => deleteCardActivity(e, i)}><i className='fa-solid fa-circle-xmark'></i></button>
                                                                        </div>
                                                                        <h6 className='acname'>{activity[0].toUpperCase()}</h6>
                                                                        <img className='badgeType' src={`../../../img/${activity[1].toLowerCase() === 'outdoor' ? 'outdoor' : 'indoor'}.png`}/>
                                                                    </div>
                                                                    <img src={`../../../img/${activity[0]}.png`} className='imageActivity card-middle'/>
                                                                    <form className='settingInfo'>
                                                                        <label htmlFor={`getDate-${i}`}>Date</label>
                                                                        <input type='date' className='getDate' id={`getDate-${i}`} value={getDate[i] || todays} min='2022-01-01' max={todays} onChange={e => getDMY(e, i)}/>
                                                                        <label htmlFor={`startTime-${i}`}>Start Time</label>
                                                                        <input type='time' className='startTime' id={`startTime-${i}`} value={startTime[i] || '00:00'} onChange={e => getStartTime(e, i)}/>
                                                                        <label htmlFor={`duration-${i}`}>Duration</label>
                                                                        {focused[i] ?
                                                                            <input type='number' className='duration' id={`duration-${i}`} value={duration[i] || ''} min='1' max='1440' placeholder='min' onBlur={() => onBlur(i)} onChange={e => getDuration(e, i)}/>
                                                                            :
                                                                            <input type='text' className='duration' id={`duration-${i}`} value={displayDuration[i] || ''} placeholder='min' onFocus={() => onFocus(i)}/>
                                                                        }
                                                                        <label htmlFor={`quantity-done-${i}`}>Quantity</label>
                                                                        {focused[i] ?
                                                                            <input type='number' className='quantity-goal' id={`quantity-goal-${i}`} value={quantityGoal[i] || ''} min='1' placeholder='goal (reps or metres)' onBlur={() => onBlur(i)} onChange={e => getQuantity(e, i)}/>
                                                                            :
                                                                            <input type='text' className='quantity-goal' id={`quantity-goal-${i}`} value={displayQuantityGoal[i] || ''} placeholder='goal (reps or metres)' onFocus={() => onFocus(i)}/>
                                                                        }
                                                                        <label htmlFor={`description-${i}`}>Description</label>
                                                                        <input type='text' className='description' id={`description-${i}`} value={description[i] || ''} maxLength='60' placeholder='max 60 letters' onChange={e => getDescribe(e, i)}/>
                                                                        <div className='button-handle-activity'>
                                                                            <button className='btn-handle-save' onClick={(e) => saveActivityToDB(e, i)}>SAVE</button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {emptySlot.map((add, i) => (
                                                            <div className='col-12 col-md-6 col-lg-4' key={i}>
                                                                <div className='cardAc withRest empty'>
                                                                    <div className='restCard text-center'>
                                                                        <h6 className='restH6'>Add more ?</h6>
                                                                        <i className='fa fa-circle-plus plusBtn' onClick={newActivity}></i>
                                                                        <img src='../../../img/rest.png' className='imageActivity'/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    :
                                                    <div className='cardAc'>
                                                        <div className='d-flex justify-content-between align-items-center card-top'>
                                                            <div className='button-handle-activity'>
                                                                <button className='btn-handle-delete' onClick={(e) => deleteCardActivity(e, numItem)}><i className='fa-solid fa-circle-xmark'></i></button>
                                                            </div>
                                                            <h6 className='acname'>{startAc.length !== 0 ? startAc[numItem][0].toUpperCase() : 'name'}</h6>
                                                            {startAc.length !== 0 ? <img className='badgeType' src={`../../../img/${startAc[numItem][1].toLowerCase() === 'outdoor' ? 'outdoor' : 'indoor'}.png`}/> : <span className='font-detail'>type</span>}
                                                        </div>
                                                        <img src={`../../../img/${startAc.length !== 0 ? startAc[numItem][0] : 'cycling'}.png`} className='imageActivity card-middle'/>
                                                        {/* <FormCard index={numItem} saveData={saveActivityToDB}/> */}
                                                        <form className='settingInfo'>
                                                            <label htmlFor={`getDate-${numItem}`}>Date</label>
                                                            <input type='date' className='getDate' id={`getDate-${numItem}`} value={getDate[numItem] || todays} min='2022-01-01' max={todays} onChange={e => getDMY(e, numItem)}/>
                                                            <label htmlFor={`startTime-${numItem}`}>Start Time</label>
                                                            <input type='time' className='startTime' id={`startTime-${numItem}`} value={startTime[numItem] || '00:00'} onChange={e => getStartTime(e, numItem)}/>
                                                            <label htmlFor={`duration-${numItem}`}>Duration</label>
                                                            {focused[numItem] ?
                                                                <input type='number' className='duration' id={`duration-${numItem}`} value={duration[numItem] || ''} min='1' max='1440' placeholder='min' onBlur={() => onBlur(numItem)} onChange={e => getDuration(e, numItem)}/>
                                                                :
                                                                <input type='text' className='duration' id={`duration-${numItem}`} value={displayDuration[numItem] || ''} placeholder='min' onFocus={() => onFocus(numItem)}/>
                                                            }
                                                            <label htmlFor={`quantity-done-${numItem}`}>Quantity</label>
                                                            {focused[numItem] ?
                                                                <input type='number' className='quantity-goal' id={`quantity-goal-${numItem}`} value={quantityGoal[numItem] || ''} min='1' placeholder='goal (reps or metres)' onBlur={() => onBlur(numItem)} onChange={e => getQuantity(e, numItem)}/>
                                                                :
                                                                <input type='text' className='quantity-goal' id={`quantity-goal-${numItem}`} value={displayQuantityGoal[numItem] || ''} placeholder='goal (reps or metres)' onFocus={() => onFocus(numItem)}/>
                                                            }
                                                            <label htmlFor={`description-${numItem}`}>Description</label>
                                                            <input type='text' className='description' id={`description-${numItem}`} value={description[numItem] || ''} maxLength='60' placeholder='max 60 letters' onChange={e => getDescribe(e, numItem)}/>
                                                            <div className='button-handle-activity'>
                                                                <button className='btn-handle-save' onClick={(e) => saveActivityToDB(e, numItem)}>SAVE</button>
                                                            </div>
                                                        </form>
                                                        <div className='slideBtn d-flex justify-content-between align-items-center mx-2 my-2 card-bottom'>
                                                            <div className='fa fa-arrow-left left' value='prev' onClick={(e) => handleSlideCardActivity(e)}></div>
                                                            <span>{`Item ${numItem + 1}`}</span>
                                                            <div className='fa fa-arrow-right right' value='next' onClick={(e) => handleSlideCardActivity(e)}></div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <div className='d-none d-lg-flex col-lg-8 mx-auto tutVid'>
                                                <iframe
                                                    className='tubeVid'
                                                    src='https://www.youtube.com/embed/ZiGE3-L4vyg'
                                                    title='YouTube video player'
                                                    frameBorder='0'>
                                                </iframe>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* <!------------------------------- END COLUMN HERE -------------------------------> */}
                            </div>
                        </div>
                    </section>
                </Template>
            }
        </>
    );
}
export default ActivityStartPage;