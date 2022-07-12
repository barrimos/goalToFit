import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './dist/ActivityCreatePage.css';
import Template from '../../Components/Template/Template';
import Carousel from '../../Components/Carousel/Carousel';
import SwitchTypeButton from '../../Components/SwitchTypeButton/SwitchTypeButton';
import axios from 'axios';
import ActivityButton from '../../Components/ActivityButton/ActivityButton';
import MockupBtn from '../../Components/MockupBtn/MockupBtn';
import StartBtn from '../../Components/StartBtn/StartBtn';
import TopNavStartBtn from '../../Components/TopNavStartBtn/TopNavStartBtn';
import ToTopBtn from '../../Components/ToTopbtn/ToTopBtn';
import config from '../../config';
import Reloading from '../../Components/Reloading/Reloading';


function ActivityCreatePage(){

    const [activitiesSets, setActivitiesSets] = useState([]);
    const [countActivities, setCountActivities] = useState(0);
    const [search, setSearch] = useState('');
    const [singleActivitySelect, setSingleActivitySelect] = useState([]);
    const [packActivitySelect, setPackActivitySelect] = useState([]);
    const [imageActive, setImageActive] = useState([]);
    const [typeAc, setTypeAc] = useState('all');
    const [isData, setIsData] = useState(false);
    const [isWaiting, setIsWaiting] = useState(true);

    const [inSession, setInSession] = useState(false);

    window.onload = function(){
        sessionStorage.removeItem('setUserSelect');
        sessionStorage.removeItem('domImageItems');
    }

    const navScrolls = () => {
        if(document.body.scrollTop > 280 || document.documentElement.scrollTop > 280){
            document.getElementById('TopNavStartBtn').style.transform = 'translateY(0)';
            document.getElementById('toTopBtn').style.display = 'block';
        } else {
            document.getElementById('TopNavStartBtn').style.transform = 'translateY(-75px)';
            document.getElementById('toTopBtn').style.display = 'none';
        }
    }

    useEffect(() => {
        if(document.getElementById('TopNavStartBtn')){
            window.addEventListener('scroll', navScrolls);
        }
        return () => {
            window.removeEventListener('scroll', navScrolls)
        }
    })

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/start', {replace: false}), [navigate]);
    const saveActivities = async () => {
        if(!isData && (singleActivitySelect.length === 0 || packActivitySelect.length === 0)){
            sessionStorage.setItem('setUserSelect', null);
            alert('no activities');
            return;
        } else {
            if(isData){
                let arrPackSplit = packActivitySelect.map(e => {return e.split('-')});
                let finalSeclectActivites = singleActivitySelect.length > 0 ? singleActivitySelect : null || packActivitySelect.length > 0 ? arrPackSplit : null;
                sessionStorage.setItem('setUserSelect', JSON.stringify(finalSeclectActivites));
                alert('activities set already');
                handleOnClick();
            }
        }
    }

    useEffect(() => {
        if(activitiesSets.length === 0){
            setIsWaiting(true);
        } else {
            setIsWaiting(false);
        }
    }, [activitiesSets])


    useEffect(() => {
        ( async () => {
        await axios.get(`${config.local}/create/individual`)
            .then(res => {
                setActivitiesSets(res.data);
            })
            .catch(err => console.error('Error: ' + err))
            })()
        return () => {
            setActivitiesSets([]);
        }
    }, []);

    useEffect(() => {
        setSearch(search);
    }, [search])


    let typeMatch = activitiesSets.filter(activity => activity.type.toLowerCase() === typeAc);
    let typeNotMatch = activitiesSets.filter(activity => activity.type.toLowerCase() !== typeAc);
    let searchMatch = activitiesSets.filter(activity => activity.name.toLowerCase().includes(search.toLowerCase()));
    let searchNotMatch = activitiesSets.filter(activity => !activity.name.toLowerCase().includes(search.toLowerCase()));

    if(typeAc){
        if(typeNotMatch){
            for(let i = 0; i < typeNotMatch.length; i++){
                typeNotMatch[i]['display'] = 'd-none';
                if(typeAc === 'all'){
                    typeNotMatch[i]['display'] = 'd-block';
                    if(searchMatch){
                        for(let i = 0; i < searchMatch.length; i++){
                            searchMatch[i]['display'] = 'd-block';
                        }
                    }
                }
            }
        }
        if(typeMatch){
            for(let i = 0; i < typeMatch.length; i++){
                typeMatch[i]['display'] = 'd-block';
                if(searchNotMatch){
                    for(let i = 0; i < searchNotMatch.length; i++){
                        searchNotMatch[i]['display'] = 'd-none';
                    }
                }
            }
        }
    }
    if(search){
        if(searchNotMatch){
            for(let i = 0; i < searchNotMatch.length; i++){
                searchNotMatch[i]['display'] = 'd-none';
            }
        }
        if(searchMatch){
            for(let i = 0; i < searchMatch.length; i++){
                searchMatch[i]['display'] = 'd-block';
                if(typeNotMatch){
                    for(let i = 0; i < typeNotMatch.length; i++){
                        typeNotMatch[i]['display'] = 'd-none';
                    }
                }
                if(typeAc === 'all'){
                    for(let i = 0; i < searchMatch.length; i++){
                        searchMatch[i]['display'] = 'd-block';
                    }
                }
            }
        }
    }

    

    const filterType = (e) => {

        const value = e.target.nextSibling.value;
        const switch_indoor = document.querySelectorAll('.label-switch-indoor');
        const switch_outdoor = document.querySelectorAll('.label-switch-outdoor');
        const switch_all = document.querySelectorAll('.label-switch-all');

        if(value === 'indoor'){
            for(let i = 0; i < switch_indoor.length; i++){
                switch_all[i].classList.remove('active');
                switch_all[i].nextSibling.removeAttribute('checked');
                switch_all[i].checked = false;
                switch_outdoor[i].classList.remove('active');
                switch_outdoor[i].nextSibling.removeAttribute('checked');
                switch_outdoor[i].checked = false;
                switch_indoor[i].classList.add('active');
                switch_indoor[i].nextSibling.setAttribute('checked', '');
                switch_indoor[i].checked = true;
            }
            setTypeAc(value);
        }
        if(value === 'all'){
            for(let i = 0; i < switch_all.length; i++){
                switch_indoor[i].classList.remove('active');
                switch_indoor[i].nextSibling.removeAttribute('checked');
                switch_indoor[i].checked = false;
                switch_outdoor[i].classList.remove('active');
                switch_outdoor[i].nextSibling.removeAttribute('checked');
                switch_outdoor[i].checked = false;
                switch_all[i].classList.add('active');
                switch_all[i].nextSibling.setAttribute('checked', '');
                switch_all[i].checked = true;
            }
            setTypeAc(value);
        }
        if(value === 'outdoor'){
            for(let i = 0; i < switch_all.length; i++){
                switch_all[i].classList.remove('active');
                switch_all[i].nextSibling.removeAttribute('checked');
                switch_all[i].checked = false;
                switch_indoor[i].classList.remove('active');
                switch_indoor[i].nextSibling.removeAttribute('checked');
                switch_indoor[i].checked = false;
                switch_outdoor[i].classList.add('active');
                switch_outdoor[i].nextSibling.setAttribute('checked', '');
                switch_outdoor[i].checked = true;
            }
            setTypeAc(value);
        }
    }

    useEffect(() => {
        if(countActivities === 0){
            setIsData(false);
        } else {
            setIsData(true);
        }
    }, [countActivities, isData])


    const countingActivities = (value) => {
        setCountActivities(value);
    }

    const handleIconAddRemove = (e) => {
        if(e.target.parentNode.classList.contains('active')){
            removeSelectActivities(e);
        } else {
            if(countActivities > 2){
                alert('Limit 3 activities');
                return;
            } else {
                setIsData(true);
                addSelectActivities(e);
            }
        }
    }

    const addSelectActivities = (e) => {
        let items = e.target.attributes.data.value.split('-');
        items.push(e.target.parentNode.attributes.pos.value);
        if(singleActivitySelect.length < 3){
            setSingleActivitySelect([...singleActivitySelect, items]);
            setImageActive([...imageActive, e.target]);
            countingActivities(countActivities + 1);
        }
    }

    const removeSelectActivities = (e) => {
        e.target.parentNode.classList.remove('active');
        let items = e.target.attributes.data.value;
        let dataLists = singleActivitySelect.filter(curList => curList[3] !== items.split('-')[3]);
        let listsParent = imageActive.filter(image => image.attributes.data.value.split('-')[3] !== items.split('-')[3]);

        imageActive.filter(image => {
            if(image.attributes.data.value === items){
                image.parentNode.classList.remove('active');
            }
        });
        setSingleActivitySelect(dataLists);
        setImageActive(listsParent);
        if(countActivities === 0){
            return;
        } else {
            countingActivities(countActivities - 1);
        }
    }

    const selectFromCarousel = (packSelected, boolean) => {
        if(packSelected === undefined || packSelected === ''){
            setIsData(boolean);
            return;
        } else {
            setPackActivitySelect(packSelected);
            setIsData(boolean);
        }
    }
    

    useEffect(async () => {
        let dataOldItems = await JSON.parse(sessionStorage.getItem('setUserSelect'));
        
        if(inSession){
            return;
        } else {
            if(dataOldItems !== null && dataOldItems.length > 0){
                await document.querySelector(`[pos='${[dataOldItems[0][4]]}'`).children[0].click();
                await document.querySelector(`[pos='${[dataOldItems[1][4]]}'`).children[0].click();
                await document.querySelector(`[pos='${[dataOldItems[2][4]]}'`).children[0].click();
                setInSession(true);
            } else {
                setInSession(false);
            }
        }
    }, [isWaiting])

    return(
        <>
            {isWaiting ?
                <Reloading/>
                :
                <Template pageId='createPage' titleHead='Activity Create' ready={isData} startWorkout={saveActivities} showNav={true} topNav={{leftBtn: {FAicon: 'arrow-left', class: 'back', linkto: '/report'}, rightBtn: {FAicon: 'save', class: 'null', linkto: '/start'}}} readyButton={true}>
                    <TopNavStartBtn isReady={isData} pressStart={saveActivities} searchValue={search} setSearch={setSearch}>
                        {singleActivitySelect.map((selected, i) =>
                            (
                                <ActivityButton key={i} behavior={'selected'} showAtTop={'showAtTop'} setScaleShowTop={'setScaleShowTop'} name={selected[0]} type={selected[1]} classifier={selected[2]} id={selected[3]} removeSelectActivities={removeSelectActivities}/>
                            )
                        )}
                        {packActivitySelect.map((selected, i) =>
                            (
                                <ActivityButton key={i} behavior={'selected'} showAtTop={'showAtTop'} setScaleShowTop={'setScaleShowTop'} name={selected.split('-')[0]} type={selected.split('-')[1]} classifier={selected.split('-')[2]} removeSelectActivities='none'/>
                            )
                        )}
                    </TopNavStartBtn>
                    <section className='main-section'>
                        <div className='container'>
                            <div className='row d-flex justify-content-between'>
                                
                                {/* LEFT COLUMN START */}
                                <div className='col-12 col-lg-5' id='leftCol'>
                                    <div className='col-12 ListsAllActivity'>
                                        <div className='row d-flex align-items-center'>
                                            <div className='col-12 col-md-12'>
                                                <div className='d-flex justify-content-between align-items-center my-3'>
                                                    <h5>Activity Set</h5>
                                                    <div>{countActivities}/3</div>
                                                </div>
                                            </div>
                                            <div className='col-12 col-sm-12 col-md-8 col-lg-12' id='packageActivityBtn'>
                                                {/* set select */}
                                                <div className='row'>
                                                    <MockupBtn/>
                                                    <SwitchTypeButton class='none' typeClick={filterType} no={0}/>
                                                    {singleActivitySelect.map((selected, i) =>
                                                        (
                                                        <ActivityButton key={i} behavior={'selected'} name={selected[0]} type={selected[1]} classifier={selected[2]} id={selected[3]} removeSelectActivities={removeSelectActivities}/>
                                                        )
                                                    )}
                                                    {packActivitySelect.map((selected, i) =>
                                                        (
                                                        <ActivityButton key={i} behavior={'selected'} name={selected.split('-')[0]} type={selected.split('-')[1]} classifier={selected.split('-')[2]} removeSelectActivities='none'/>
                                                        )
                                                    )}
                                                </div>
                                                {/* set select */}
                                            </div>
                                            <StartBtn pressStart={saveActivities} isReady={isData}/>
                                            <div className='col-12 col-md-6 col-lg-12'>
                                                <form className='form-search'>
                                                    <input type='search' value={search || ''} name='input-search' id='input-search' className='input-search' placeholder='Activity Search' onChange={(e) => setSearch(e.target.value)}/>
                                                </form>
                                            </div>
                                            <SwitchTypeButton class='block' typeClick={filterType} no={1}/>
                                        </div>
                                    </div>
                                    <div className='row no-gutters'>
                                        {/* list activities from database */}
                                        {activitiesSets.map((activity, i) =>
                                            (
                                                <ActivityButton key={i} behavior={'list'} display={activity.display || ''}pos={i} name={activity.name} type={activity.type} id={activity.id} classifier={activity.classifier} select={singleActivitySelect} handleIconAddRemove={handleIconAddRemove}/>
                                            )
                                        )}
                                        {/* list activities from database */}
                                    </div>
                                </div>
                                {/* LEFT COLUMN END */}
                                {/* RIGHT COLUMN START */}
                                <div className='col-12 col-md-12 col-lg-6' id='rightCol'>
                                    <div className='col-12 packageTitle'>
                                        <div className='d-flex justify-content-between align-items-center my-3'>
                                            <h5>Activity Package</h5>
                                        </div>
                                    </div>
                                    <Carousel selectFromCarousel={selectFromCarousel} amountActivities={countActivities} count={countingActivities}/>
                                </div>
                                {/* RIGHT COLUMN END */}
                            </div>
                        </div>
                    </section>
                    <ToTopBtn/>
                </Template>
            }
        </>
    );
}
export default ActivityCreatePage;