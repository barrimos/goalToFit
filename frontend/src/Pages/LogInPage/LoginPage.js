import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './dist/LoginPage.css';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Footer } from '../../Components/Template/Template';
import InputForm from '../../Components/InputForm/InputForm';
import Logo from '../../Components/Logo/Logo';
import axios from 'axios';
import config from '../../config';

function LoginPage(){

    const [uid, setUID] = useState();
    const [upw, setUPW] = useState();
    const [isFullfill, setIsFullfill] = useState([false, false]);
    const [remainAuthen, setRemainAuthen] = useState(3);
    //creating IP state
    const [ip, setIP] = useState('');

    //creating function to load ip address from the API
    const getIPData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
    }

    useEffect( () => {
        //passing getData method to the lifecycle method
        getIPData()
    }, [])

    const authLogin = async () => {
        await axios.post(`${config.vercel}profile/authen`, {uid, upw})
            .then(res => {
                if(remainAuthen <= 0){
                    setRemainAuthen(0);
                    return;
                }
                if(res.data !== null){
                    console.log('correct');
                } else {
                    alert(`Username or Password incorrect remaining attemps is ${remainAuthen - 1}`);
                    setRemainAuthen(remainAuthen - 1);
                }
            })
            .catch(err => console.error('Error: ', err))
    }

    return(
        <>
            <Wrapper hasMenu={false}>
                <div className='loginComp'>
                    <div className='container'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col-12 col-sm-8 col-md-6 col-lg-4'>
                                <Logo srcImg={'../../img/gtf-logo.png'} subtext='Goal to fit'/>
                                {remainAuthen === 0 ?
                                    <div className='warnedLogin text-center'>
                                        Too many failed login attempts.<br/>
                                        Please try again in 20 minutes.
                                    </div>
                                    : ''
                                }
                                <InputForm
                                    respond='login'
                                    classBtn='authenBtn'
                                    titleForm='Log In'
                                    textBtn='Log In'

                                    isFullfill={isFullfill}
                                    setIsFullfill={setIsFullfill}
                                    fullfill={!isFullfill.some(bool => bool === false)}

                                    action={authLogin}
                                    UID={setUID}
                                    UPW={setUPW}
                                />

                                <div className='tools d-block text-center justify-content-center align-items-center'>
                                    <Link to='/reset_password' className='font-detail mx-2 my-2'>Forgot password</Link>
                                    <p className='font-detail mx-2'>Don't Have an Account?&nbsp;<Link to='/signup' className='d-inline-block'>Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    );
}
export default LoginPage;