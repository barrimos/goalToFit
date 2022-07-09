import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PersonalForm.css';
import mockProfile from './mockProfile.png';
import config from '../../config';
import SwitchGenderButton from '../SwitchGenderButton/SwitchGenderButton';
import WeeklyCheckbox from '../WeeklyCheckbox/WeeklyCheckbox';
import Button from '../Button/Button';
import Checkbox_agreeRegis from '../Checkbox_agreeRegis/Checkbox_agreeRegis';


function PersonalForm(props){

    const [isAllow, setIsAllow] = useState(true);

    const [username, setUsername] = useState();
    const [avatar, setAvatar] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState('unique');
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [goal, setGoal] = useState();
    const [days, setDays] = useState([]);
    const [time, setTime] = useState();
    const [achievement, setAchievement] = useState(0);
    const [isAgreedRegis, setIsAgreedRegis] = useState(false);

    // useEffect(() => {
    //     let loc = window.location.pathname;
    //     if(loc !== `/register/${loc.split('/')[2]}`){
    //         window.location.href = `${window.location.origin}/login`;
    //     } else {
    //         setIsAllow(true);
    //     }
    // }, [])

    const agreeTerm = (e) => {
        if(e.target.checked){
            setIsAgreedRegis(true)
        } else {
            setIsAgreedRegis(false)
        }
    }

    const handleTime = (e) => {
        setTime(e.target.value);
    }

    const getData = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value);
        }
        if(e.target.name === 'age'){
            if(e.target.value > 99){
                alert('Your input is wrong')
                e.target.value = '';
            }
            setAge(e.target.value);
        }
        if(e.target.name === 'weight'){
            if(e.target.value > 220){
                alert('Your input is wrong')
                e.target.value = '';
            }
            setWeight(e.target.value);
        }
        if(e.target.name === 'height'){
            if(e.target.value > 220){
                alert('Your input is wrong')
                e.target.value = '';
            }
            setHeight(e.target.value);
        }
        if(e.target.name === 'goal'){
            if(e.target.value.length > 250){
                alert('Describe have reached their limit')
                e.target.value = '';
            }
            setGoal(e.target.value);
        }
    }

    const encodeImageFileAsURL = (element) => {
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log('RESULT', reader.result)
        }
        reader.readAsDataURL(file);
    }

    const userPersonalRegister = async () => {
        let User = {
            'username': username,
            'age': Number(age),
            'gender': gender,
            'weight': Number(weight),
            'height': Number(height),
            'goal': goal,
            'setDayAndTime': {
                'days': days,
                'time': time
            },
            'achievement': achievement || 0
        }
        // console.log(User);

        await axios.put(`${config.vercel}register/personal_regis`, User)
            .then(res => {
                console.log(res.data);
                window.location.href = `${window.location.origin}/login`;
                // sessionStorage.clear();
            })
            .catch(err => {
                alert('Your register is not complete, Username or email is already exist');
                document.getElementById('agreeTerm').checked = false;
                // sessionStorage.removeItem('completeAllData');
                agreeTerm();
            });
    }


    return(
        <>
            {isAllow ?
                <form>
                    <div className='container'>
                        <h3 className='mb-5'>{props.headTitle || 'Registeration form'}</h3>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12'>
                                <div className='d-block d-sm-flex justify-content-center align-items-center'>
                                    <img src={mockProfile || props.userProfile.img} alt='image profile' width='90'/>
                                    <input type='file' id='myFile' name='filename' onChange={e => encodeImageFileAsURL(e)}/>
                                </div>
                                <label className='label-useranme mt-4' htmlFor='user-name'>Username</label>
                                <input type='text' id='user-name' className='user-name' name='username' onChange={e => getData(e)} required/>
                            </div>
                            <div className='col-12 my-4 my-3'>
                                <div className='row'>
                                    <div className='col-12 col-lg-3 my-2'>
                                        <SwitchGenderButton gender={['Male', 'Female']} setGender={setGender}/>
                                    </div>
                                    <div className='col-12 col-lg-3 my-2'>
                                        <label className='label-age' htmlFor='user-age'>Age</label>
                                        <input type='number' id='user-age' className='user-age' name='age' min={0} max={99} onChange={e => getData(e)} required/>
                                    </div>
                                    <div className='col-12 col-lg-3 my-2'>
                                        <label className='label-height' htmlFor='user-height'>Height</label>
                                        <input type='number' id='user-height' className='user-height' min={0} max={220} placeholder='cm' name='height' onChange={e => getData(e)} required/>
                                    </div>
                                    <div className='col-12 col-lg-3 my-2'>
                                        <label className='label-weight' htmlFor='user-weight'>Weight</label>
                                        <input type='number' id='user-weight' className='user-weight' min={0} max={220} placeholder='kg' name='weight' onChange={e => getData(e)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-4 my-3'>
                                <label className='label-goal' htmlFor='user-goal'>Goal</label>
                                <textarea id='user-goal' className='user-goal' placeholder='Describe your goal : max 250 characters (include space)' name='goal' maxLength={250} onChange={e => getData(e)}></textarea>
                            </div>
                            <div className='col-12 col-md-8 my-4 my-3'>
                                <label className='label-exercise'>Exercise Day</label>
                                <WeeklyCheckbox setDays={setDays}/>
                            </div>
                            <div className='col-12 col-md-4 my-4 my-3'>
                                <label className='label-time'>Daily time workout</label>
                                <input type='time' id='startTime' className='time startTime' name='startTime' value={time || '00:00'} onChange={handleTime} required/>
                            </div>
                            <div className='col-12 my-3'>
                                <div className='checkboxAgree'>
                                    <Checkbox_agreeRegis class='agreeTerm' id='agreeTerm' name='agreeTerm' agreeTerm={agreeTerm}/>
                                    <span>agree to terms and conditions</span>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <div className='btnSubmit d-block text-center d-sm-flex justify-content-center align-items-center'>
                                    <Button classBtn='regisBtn' action={userPersonalRegister} isAgreedRegis={isAgreedRegis} text='Register'/>
                                    <Button classBtn='cancelBtn' text='Cancel'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                :
                ''
            }
        </>
    );
}
export default PersonalForm;