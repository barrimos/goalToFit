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

    const [isModalOpen, setIsModalOpen] = useState();
    const [user, setUser] = useState();
    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(async () => {
        await axios.get(`${config.vercel}profile/user/barrimos`)
            .then(res => setUser(res.data))
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
        if(user && user){
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
                                stateModalOpen={isModalOpen}
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
                                    <img src={user && user.img} alt='imgProfile' className='imgProfile'/>
                                    <button type='button' onClick={e => editorOpen(e)} className='profileEditBtn'>Edit profile</button>
                                </div>
                                <div className='userGoal'>
                                    <h3>My goal</h3>
                                    <p className='myGoal'>{user && user.goal}</p>
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
                                                BMI : {getBmiResult(user && user.weight, user && user.height)}
                                            </div>
                                            <div className='result_BMI'>
                                                <span className='res'><em>{calcBMI(user && user.weight, user && user.height)}</em></span>
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