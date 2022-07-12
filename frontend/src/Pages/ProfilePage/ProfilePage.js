import React, { useState, useEffect } from 'react';
import Template from '../../Components/Template/Template';
import Modal from '../../Components/Modal/Modal';
import './dist/ProfilePage.css';
import PersonalForm from '../../Components/PersonalForm/PersonalForm';
import axios from 'axios';
import config from '../../config';
import { calcBMI, getBmiResult } from '../../utils/bmi';
import Reloading from '../../Components/Reloading/Reloading';

function ProfilePage(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(async () => {
        await axios.get(`${config.local}/profile/`)
            .then(res => {
                if(res.data){
                    setUser(res.data);
                } else {
                    setUser(undefined)
                }
            })
            .catch(err => console.error('Error: ' + err))
    }, [])

    const editorOpen = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    const stateCloseModal = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        if(user !== undefined){
            setIsWaiting(false);
        } else {
            setIsWaiting(true);
        }
    }, [user])

    return(
        <>
            {isWaiting ?
                <Reloading/>
                :
                <Template search={false} titleHead='Profile' showNav={false} readyButton={false}>
                    <div className='container'>
                        {isModalOpen ?
                            <Modal
                                headTitle='Edit Personal'
                                stateOpenModal={isModalOpen}
                                stateCloseModal={stateCloseModal}
                                overflowY='scroll'
                            >
                                <PersonalForm
                                    user={user && user}
                                />
                            </Modal>
                            :
                            ''
                        }
                        <div className='row'>
                            <div className='col-12 col-md-4 column-profile'>
                                <div className='cardProfile'>
                                    <img src={user && user.img ? user.img : '../../img/gtf-logo.png'} alt='imgProfile' className='imgProfile'/>
                                    <button type='button' onClick={e => editorOpen(e)} className='profileEditBtn'>Edit profile</button>
                                </div>
                                <div className='userGoal'>
                                    <h3>My goal</h3>
                                    <p className='myGoal'>{user && user.goal ? user.goal : 'Burn 2,000 calories each workout.'}</p>
                                </div>
                            </div>
                            <div className='col-12 col-md-8 column-data'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 blog-data'>
                                        <div className='inside-block'>
                                            <div className='title-data'>
                                                Calories burn&nbsp;
                                                <select>
                                                    <option selected>month</option>
                                                    <option>week</option>
                                                    <option>day</option>
                                                </select>
                                            </div>
                                            <div className='result_Calories'>
                                                <span className='res'><em>20,000</em></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 blog-data'>
                                        <div className='inside-block'>
                                            <div className='title-data'>
                                                BMI : {getBmiResult(user && user.weight ? user.weight : 60, user && user.height ? user.height : 165)}
                                            </div>
                                            <div className='result_BMI'>
                                                <span className='res'><em>{calcBMI(user && user.weight ? user.weight : 60, user && user.height ? user.height : 165)}</em></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 blog-data'>
                                        <div className='inside-block'>
                                            <div className='title-data'>
                                                Collect hours
                                            </div>
                                            <div className='result_Hrs'>
                                                <span className='res'><em>400</em></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-md-6 blog-data'>
                                        <div className='inside-block'>
                                            <div className='title-data'>
                                                Complete Workouts
                                            </div>
                                            <div className='result_Works'>
                                                <span className='res'><em>106</em></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Template>
            }
        </>
    )
}
export default ProfilePage;