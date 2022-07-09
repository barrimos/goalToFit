import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import './dist/ActivityReportPage.css';
import Template from '../../Components/Template/Template';
import RestCard from '../../Components/RestCard/RestCard';
import { classifierActivity } from '../../utils/classifileActivity';
import { minToHour } from '../../utils/minToHour';
import { calcBMI } from '../../utils/bmi';
import Modal from '../../Components/Modal/Modal';
import ContentInModal from '../../Components/Modal/ContentInModal';
import FormActivity from '../../Components/FormActivity/FormActivity';
import ButtonInModal from '../../Components/Modal/ButtonInModal';
import config from '../../config';
import FullDate from '../../Components/FullDate/FullDate';
import Reloading from '../../Components/Reloading/Reloading';

function ActivityReportPage(){
    
    const [user, setUser] = useState();
    const [records, setRecords] = useState([]);
    const [userBmi, setUserBmi] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState();
    const [dataToModal, setDataToModal] = useState([]);
    const [classType, setClassType] = useState('');
    const [getUpdateData, setGetUpdateData] = useState();
    const [actionManageItem, setActionManageItem] = useState();
    const [isWaiting, setIsWaiting] = useState(true);
    const imgADS = '../img/Masters-Sprint.jpg';
    const startTime = new Date(user && user.createdAt).getTime();
    const nowTime = new Date().getTime();
    const diffTime = nowTime - startTime;
    const diffDay = Math.floor(diffTime / (1000 * 3600 * 24));

    useEffect(() => {
        if(user === undefined || records.length === 0){
            setIsWaiting(true);
        } else {
            setTimeout(() => {
                setIsWaiting(false);
                doneLevel();
                setUserBmi(calcBMI(user && user.weight, user && user.height, 0));
            }, 1000);
        }
    }, [user, records])

    useEffect(() => {
        ( async () => {
            await axios.get(`${config.vercel}profile/user/barrimos`)
                .then(res => {
                    setUser(res.data);
                })
                .catch(err => console.error(err))
        })()
    }, []);

    useEffect(() => {
        ( async () => {
            await axios.get(`${config.vercel}report/records`)
            .then(res => {
                setRecords(res.data.reverse());
            })
            .catch(err => console.error('Error: ' + err))
        })()
    }, [isUpdate]);

    useEffect(() => {
        doneLevel();
        setIsLoaded(false);
    }, [isLoaded, user, records])

    useEffect(() => {
        getNewData(getUpdateData);
    }, [getUpdateData])
    
    const getNewData = (values) => {
        setGetUpdateData(values)
    }

    const doneLevel = async () => {
        let elems = await document.querySelectorAll('.status');

        for(let i = 0; i < elems.length; i++){
            let statsUser = await Number(elems[i].attributes.value.value);
            let statsGoal = await Number(elems[i].attributes.goal.value);
            // console.log(elems[i].attributes.name)
            if(elems[i].attributes.name){
                if(statsUser > statsGoal){
                    if(elems[i].classList.contains('welldone') || elems[i].classList.contains('fair')){
                        elems[i].classList.remove('welldone') || elems[i].classList.remove('fair');
                    } else {
                        elems[i].classList.add('try');
                    }
                } else {
                    if(elems[i].classList.contains('fair') || elems[i].classList.contains('try')){
                        elems[i].classList.remove('fair') || elems[i].classList.remove('try');
                    } else {
                        elems[i].classList.add('welldone');
                    }
                }
            } else {
                if(Math.abs(statsUser > (statsGoal - ((statsGoal * 10) / 100)))){
                    if(elems[i].classList.contains('fair') || elems[i].classList.contains('try')){
                        elems[i].classList.remove('fair') || elems[i].classList.remove('try');
                    } else {
                        elems[i].classList.add('welldone');
                    }
                } else if(Math.abs(statsUser < (statsGoal - ((statsGoal * 10) / 100))) && Math.abs(statsUser >= (statsGoal - ((statsGoal * 50) / 100)))){
                    if(elems[i].classList.contains('welldone') || elems[i].classList.contains('try')){
                        elems[i].classList.remove('welldone') || elems[i].classList.remove('try');
                    } else {
                        elems[i].classList.add('fair');
                    }
                } else if(Math.abs(statsUser < (statsGoal - ((statsGoal * 50) / 100)))){
                    if(elems[i].classList.contains('welldone') || elems[i].classList.contains('fair')){
                        elems[i].classList.remove('welldone') || elems[i].classList.remove('fair');
                    } else {
                        elems[i].classList.add('try');
                    }
                } else {
                    if(elems[i].classList.contains('welldone') || elems[i].classList.contains('fair') || elems[i].classList.contains('try')){
                        elems[i].classList.remove('welldone') || elems[i].classList.remove('fair') || elems[i].classList.contains('try');
                    }
                }
            }
        }
    }

    const reverseRecords = () => {
        let reverse = records.reverse();
        setRecords(reverse);
        setIsLoaded(true);
        if(isSorted === true){
            setIsSorted(false);
        } else {
            setIsSorted(true);
        }
    }

    const handleButtonModal = (e, itemID, itemNumber) => {
        e.preventDefault();
        if(e.target.name === 'delete'){
            setClassType('delete');
            setDataToModal([records.filter((record) => record.id === itemID), itemID, itemNumber]);
        }
        if(e.target.name === 'edit'){
            setClassType('edit');
            setDataToModal([records.filter((record) => record.id === itemID), itemID, itemNumber]);
        }
        setIsModalOpen(true);
    }

    // if parent click close
    const stateCloseModal = () => {
        setIsModalOpen(false);
    }

    const getFunctionCloseWhenAction = (callback) => {
        setActionManageItem(false);
        return callback;
    }

    const deleteActivity = async (id, boolean) => {
        let refreshData =  records.filter(record => record.id !== id);
        await axios.delete(`${config.vercel}report/delete/${id}`)
            .then(() => {
                setRecords(refreshData);
                setActionManageItem(true);
                getFunctionCloseWhenAction();
                if(boolean === true || boolean === null || boolean === undefined || boolean === ' '){
                    setIsLoaded(true);
                    setIsUpdate(false);
                } else {
                    setIsLoaded(false);
                }
            })
            .catch(err => console.error(err))
    }
    const editActivity = async (id, data, boolean) => {
        await axios.put(`${config.vercel}report/update/${id}`, {data})
            .then(() => {
                setIsUpdate(true);
                setActionManageItem(true);
                getFunctionCloseWhenAction();
                if(boolean === true || boolean === null || boolean === undefined || boolean === ' '){
                    setIsLoaded(true);
                    setIsUpdate(false);
                } else {
                    setIsLoaded(false);
                }
            })
            .catch(err => console.error(err))
    }

    return(
        <>
            {isWaiting ?
                <Reloading/>
                :
                <Template search={false} titleHead='Activity Report' showNav={true} topNav={{leftBtn: {FAicon: 'power-off', class: 'logout', linkto: '/'}, rightBtn: {FAicon: 'plus', class: 'plus', linkto: '/create'}}} readyButton={false}>
                    {/* <!-- MAIN CONTENT SECTION START --> */}
                    {isModalOpen ?
                        <Modal
                            headTitle='Manage Activity'
                            stateModalOpen={isModalOpen}
                            stateCloseModal={stateCloseModal}
                            getFunctionCloseWhenAction={getFunctionCloseWhenAction}
                            actionManageItem={actionManageItem}
                            overflowY='hidden'
                        >
                            <ContentInModal
                                ItemNumber={dataToModal[2] + 1}
                                activityName={dataToModal[0][0].name}
                            >
                                <FormActivity data={dataToModal} getNewData={getNewData}/>
                            </ContentInModal>
                            <ButtonInModal
                                classButtonType={classType}
                                activityId={dataToModal[0][0].id}
                                deleteFunc={deleteActivity}
                                editFunc={editActivity}
                                newData={getUpdateData}
                                closeModal='closeModal'
                            />
                        </Modal>
                        :
                        ''
                    }
                    <section className='main-section'>
                        <div className='container'>
                            <div className='row'>
                                {/* <!------------------------------- START COLUMN HERE -------------------------------> */}

                                {/* <!-- LEFT COLUMN START --> */}
                                <div className='col-12 col-md-6 col-lg-5 order-0 order-md-0 order-lg-0 my-2' id='date-day'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='weight-300 font-subhead font-sm-subhead'><FullDate/></div>
                                        
                                        <div className='weight-300 font-subhead font-sm-subhead'>day {diffDay}</div>
                                    </div>
                                </div>

                                <div className='col-12 col-sm-8 col-md-6 col-lg-5 order-1 order-md-4 order-lg-4' id='profile'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row body-top d-flex justify-content-between h-100'>
                                                <div className='col-12 d-flex justify-content-start align-items-center'>
                                                    <div className='profile-image mr-3'>
                                                        <img src={user ? user.img : '../../img/gtf-logo.png'} alt='profile image'/>
                                                    </div>
                                                    <div className='profile-name font-head weight-900 primary-text-color text-left'>{user ? user.username : 'John Doe'} {`(${user && user.age})`}</div>
                                                </div>
                                                <div className='create-btn col-md-6 d-none d-md-flex px-0'>
                                                    <div className='col-auto d-flex justify-content-end align-items-center'>
                                                        <Link to='/create' className='d-flex justify-content-center primary-red align-items-center'>
                                                            {/* <!-- Right Button --> */}
                                                            <i className='fa fa-plus'></i>
                                                            {/* <!-- Right Button --> */}
                                                            <p className='weight-300 primary-text-color ml-2' htmlFor='nav-btn-plus'>Create activity</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className='col-12 stats-goal'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <div className='font-detail text-left'>&nbsp;</div>
                                                            <div className='font-detail text-left'>Achievement</div>
                                                            <div className='font-detail text-left'>Weight</div>
                                                            <div className='font-detail text-left'>BMI</div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='font-detail text-center'>Stats</div>
                                                            <div className='font-detail text-center status' name='statsCard' value={9} goal={62}>9</div>
                                                            <div className='font-detail text-center status' name='statsCard' value={user && user.weight} goal={55}>{user && user.weight}</div>
                                                            <div className='font-detail text-center status' name='statsCard' value={userBmi} goal={22}>{userBmi}</div>
                                                        </div>
                                                        <div className='col-3'>
                                                            <div className='font-detail text-center'>Goal</div>
                                                            <div className='font-detail text-center'>62</div>
                                                            <div className='font-detail text-center'>55</div>
                                                            <div className='font-detail text-center'>22</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Score display on mobile and tablet size --> */}
                                <div className='col-12 col-sm-4 col-md-6 col-lg-5 order-2 order-md-2 order-lg-2 mb-md-3 mt-2 mt-sm-0' id='score'>
                                    <div className='row score-card mx-auto'>
                                        <div className='d-flex d-sm-block d-md-flex justify-content-center align-items-center'>
                                            <h5 className='text-center mx-2'>Score</h5>
                                            <h2 className='text-center fair weight-900 mx-2 scored'>5.2</h2>
                                            <p className='text-center weight-300 mx-2'>of 10</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-8 col-lg-5 order-5 order-md-4 order-lg-6' id='activity-list'>
                                    <div className='activity-title bolder-font font-subhead mt-3 d-flex justify-content-between align-items-center'>
                                        <span>Activities lists</span>
                                        <span>ordered by {isSorted ? 'First' : 'Last'}
                                            <i className='fa fa-sort mt-1 ml-3' onClick={reverseRecords}></i>
                                        </span>
                                    </div>
                                    {/* <!-- Activities list --> */}
                                    <div className='activity-container fixed-card'>
                                        {/* array from history recorded data */}
                                        {records.length > 0 && !isLoaded ?
                                            records.map((record, i) => (
                                                <div className='row activity-item py-2' key={i}>
                                                    <div className='col-12'>
                                                        <div className='row justify-content-between w-100 mx-auto no-gutters'>
                                                            <div className='col-3 activity-icon'>
                                                                <img className='mx-auto' src={`../img/${record.name}.png`} alt='cyclist activity'/>
                                                            </div>
                                                            <div className='col-9 justify-content-between'>
                                                                <div className='row no-gutters'>
                                                                    <div className='col-5 text-left'>
                                                                        <strong className='col-12 d-block p-0'>{i + 1}. {record.name}</strong>
                                                                        <small className='col-12 d-block p-0'>Duration</small>
                                                                        <small className='col-12 d-block p-0'>Start at</small>
                                                                    </div>
                                                                    <div className='col-7 activity-result'>
                                                                        <strong className='col-12 d-block p-0 status' id={`record-${i + 1}`} value={record.quantity.done} goal={record.quantity.goal}>{classifierActivity(record.quantity.done, record.quantity.classifier)} / {classifierActivity(record.quantity.goal, record.quantity.classifier, 2)}</strong>
                                                                        <small className='col-12 d-block p-0'>{minToHour(record.duration)}</small>
                                                                        <small className='col-12 d-block p-0'>{record.startTime}<br/>{record.atDate}</small>
                                                                    </div>
                                                                    <details className='col-12 mx-auto d-block font-detail'>
                                                                        <summary className='weight-300'>details</summary>
                                                                        <p className='ml-2 mb-2'>{record.description ? record.description : 'goal to fit'}</p>
                                                                        <div className='adjustable'>
                                                                            <button className='weight-300 adjustableBtn-delete' value={record.id} name='delete' onClick={e => handleButtonModal(e, record.id, i)}>delete</button>
                                                                            <button className='weight-300 adjustableBtn-edit' value={record.id} name='edit' onClick={e => handleButtonModal(e, record.id, i)}>edit</button>
                                                                        </div>
                                                                    </details>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <RestCard/>
                                        }
                                    </div>
                                    {/* <!-- Activities list --> */}
                                </div>
                                {/* <!-- LEFT COLUMN END --> */}

                                {/* <!-- RIGHT COLUMN START --> */}
                                <div className='col-12 col-md-6 col-lg-7 order-3 order-md-1 order-lg-1 my-3 my-md-0' id='graph-title'>
                                    <div className='row justify-content-between align-items-center'>
                                        <div className='col-12 font-subhead text-right text-md-left'>
                                            Total progress
                                            <div className='bar-in mt-1'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-6 col-lg-7 order-3 order-md-3 order-lg-3' id='graph'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='meter'>
                                                <ul>
                                                    <li>0</li>
                                                    <li>35</li>
                                                    <li>65</li>
                                                    <li>100</li>
                                                </ul>
                                                <ul>
                                                    <li>0</li>
                                                    <li>10</li>
                                                    <li>20</li>
                                                    <li>30</li>
                                                </ul>
                                            </div>
                                            <div className='graph-container'>
                                                <svg className='graph-user' xmlns='http://www.w3.org/2000/svg' viewBox='0 -20 1440 320'>
                                                    <path className='color-graph-weight' fillOpacity='1' d='M0,224L57.6,256L115.2,224L172.8,224L230.4,10L288,224L345.6,192L403.2,192L460.8,224L518.4,256L576,160L633.6,64L691.2,224L748.8,96L806.4,96L864,128L921.6,64L979.2,64L1036.8,256L1094.4,32L1152,128L1209.6,160L1267.2,96L1324.8,288L1382.4,96L1440,256L1440,320L1382.4,320L1324.8,320L1267.2,320L1209.6,320L1152,320L1094.4,320L1036.8,320L979.2,320L921.6,320L864,320L806.4,320L748.8,320L691.2,320L633.6,320L576,320L518.4,320L460.8,320L403.2,320L345.6,320L288,320L230.4,320L172.8,320L115.2,320L57.6,320L0,320Z'></path>
                                                </svg>
                                                <svg className='graph-user' xmlns='http://www.w3.org/2000/svg' viewBox='0 -20 1440 320'>
                                                    <path className='color-graph-calories' fillOpacity='1' d='M0,96L24,96C48,96,96,96,144,85.3C192,75,240,53,288,80C336,107,384,181,432,208C480,235,528,213,576,186.7C624,160,672,128,720,144C768,160,816,224,864,234.7C912,245,960,203,1008,170.7C1056,139,1104,117,1152,122.7C1200,128,1248,160,1296,165.3C1344,171,1392,149,1416,138.7L1440,128L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z'></path>
                                                </svg>
                                            </div>
                                            <div className='d-flex label-container'>
                                                <div className='font-detail color-graph-weight label-graph'>Weight(Kg)</div>
                                                <div className='font-detail color-graph-calories label-graph'>Calories</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-4 col-lg-7 order-3 order-md-5 order-lg-5 d-none d-md-block mt-3' id='donut'>
                                    <div className='card'>
                                        <div className='card-body d-md-flex d-lg-flex justify-content-center align-items-center text-center'>
                                            {/* <!-- Donut chart --> */}
                                            <svg    className='m-1 circle-chart-day'
                                                    viewBox='0 0 33.83098862 33.83098862'
                                                    width='160'
                                                    height='160'
                                                    xmlns='http://www.w3.org/2000/svg'>
                                                <circle className='circle-chart-day-background'
                                                        stroke='#efefef'
                                                        strokeWidth='2'
                                                        fill='none'
                                                        cx='16.91549431'
                                                        cy='16.91549431'
                                                        r='15.91549431'/>
                                                <circle className='circle-chart-day-circle circle-chart-day-circle-negative'
                                                        stroke='#00acc1'
                                                        strokeWidth='2'
                                                        strokeDasharray='60,100'
                                                        strokeLinecap='round'
                                                        fill='none'
                                                        cx='16.91549431'
                                                        cy='16.91549431'
                                                        r='15.91549431'/>
                                                <g className='circle-chart-day-info'>
                                                    <text   className='circle-chart-day-percent'
                                                            x='16.91549431'
                                                            y='15.5'
                                                            alignmentBaseline='central'
                                                            textAnchor='middle'
                                                            fontSize='8'>
                                                            -60%
                                                    </text>
                                                    <text   className='circle-chart-day-subline'
                                                            x='16.91549431'
                                                            y='20.5'
                                                            alignmentBaseline='central'
                                                            textAnchor='middle'
                                                            fontSize='2.5'>
                                                            Today
                                                    </text>
                                                </g>
                                            </svg>
                                            <svg    className='m-1 circle-chart-week'
                                                    viewBox='0 0 33.83098862 33.83098862'
                                                    width='160'
                                                    height='160'
                                                    xmlns='http://www.w3.org/2000/svg'>
                                                <circle className='circle-chart-week-background'
                                                        stroke='#efefef'
                                                        strokeWidth='2'
                                                        fill='none'
                                                        cx='16.91549431'
                                                        cy='16.91549431'
                                                        r='15.91549431'/>
                                                <circle className='circle-chart-week-circle'
                                                        stroke='#00acc1'
                                                        strokeWidth='2'
                                                        strokeDasharray='30,100'
                                                        strokeLinecap='round'
                                                        fill='none'
                                                        cx='16.91549431'
                                                        cy='16.91549431'
                                                        r='15.91549431'/>
                                                <g className='circle-chart-week-info'>
                                                    <text   className='circle-chart-week-percent'
                                                            x='16.91549431'
                                                            y='15.5'
                                                            alignmentBaseline='central'
                                                            textAnchor='middle'
                                                            fontSize='8'>
                                                            30%
                                                    </text>
                                                    <text   className='circle-chart-week-subline'
                                                            x='16.91549431'
                                                            y='20.5'
                                                            alignmentBaseline='central'
                                                            textAnchor='middle'
                                                            fontSize='2.5'>
                                                            Last week
                                                    </text>
                                                </g>
                                            </svg>
                                            <svg    className='m-1 circle-chart-year'
                                                    viewBox='0 0 33.83098862 33.83098862'
                                                    width='160'
                                                    height='160'
                                                    xmlns='http://www.w3.org/2000/svg'>
                                                <circle className='circle-chart-year-background'
                                                        stroke='#efefef'
                                                        strokeWidth='2'
                                                        fill='none'
                                                        cx='16.91549431'
                                                        cy='16.91549431'
                                                        r='15.91549431'/>
                                                <circle className='circle-chart-year-circle'
                                                        stroke='#00acc1'
                                                        strokeWidth='2'
                                                        strokeDasharray='10,100'
                                                        strokeLinecap='round'
                                                        fill='none'
                                                        cx='16.91549431'
                                                        cy='16.91549431'
                                                        r='15.91549431'/>
                                                <g className='circle-chart-year-info'>
                                                    <text   className='circle-chart-year-percent'
                                                            x='16.91549431'
                                                            y='15.5'
                                                            alignmentBaseline='central'
                                                            textAnchor='middle'
                                                            fontSize='8'>
                                                            10%
                                                    </text>
                                                    <text   className='circle-chart-year-subline'
                                                            x='16.91549431'
                                                            y='20.5'
                                                            alignmentBaseline='central'
                                                            textAnchor='middle'
                                                            fontSize='2.5'>
                                                            This year
                                                    </text>
                                                </g>
                                            </svg>
                                            {/* <!-- Donut chart --> */}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 col-md-12 col-lg-7 order-last px-0' id='ads'>
                                    <div className='ads-fit'>
                                        <img src={imgADS} alt='master athlete sprint' className='ads-img'/>
                                        <h3 className='ads-head weight-900 p-2 text-right' style={{backgroundImage: `url(${imgADS})`}}>GO<br/>TO BE<br/>MASTER</h3>
                                    </div>
                                </div>
                                {/* <!-- RIGHT COLUMN END --> */}


                                {/* <!------------------------------- END COLUMN HERE -------------------------------> */}
                            </div>
                        </div>
                    </section>
                    {/* <!-- MAIN CONTENT SECTION END --> */}
                </Template>
            }     
        </>
    );
}
export default ActivityReportPage;