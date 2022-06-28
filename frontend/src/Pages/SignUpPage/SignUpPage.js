import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './dist/SignUpPage.css';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Footer } from '../../Components/Template/Template';
import axios from 'axios';
import config from '../../config';
import InputForm from '../../Components/InputForm/InputForm';
import Logo from '../../Components/Logo/Logo';

function SignUpPage(){

    const [email, setEmail] = useState();
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [isAgreeTermCheck, setIsAgreeTermCheck] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);


    useEffect( async () => {
        await axios.get(`${config.vercel}profile`)
        .then(res => {
            if(res.data.length === 0){
                setId('100001');
            } else {
                setId(Number(res.data[res.data.length - 1].id));
            }
        })
        .catch(err => alert('Error: ' + err))
    }, [])

    useEffect(() => {
        if(email && pass.length >= 6 && isAgreeTermCheck){
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }
    }, [isAgreeTermCheck, email, pass]);

    const signupFirst = async () => {
        const authen = {
            id: String(id + 1),
            email: email,
            password: pass
        };
        // console.log(authen);
        await axios.post(`${config.vercel}register/authentication_regis`, authen)
        .then(res => {
            alert('Email registeration complete click to continue..', res);
            window.location.href = window.location.origin + `/register/${email}`;
            })
            .catch(err => {
                alert('Error: Email has already axists', err);
            })
    }


    return(
        <>
            <Wrapper hasMenu={false}>
                <div className='signup'>
                    <div className='container'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='col-12 col-sm-8 col-md-6 col-lg-4'>
                                <Logo srcImg={'../../img/gtf-logo.png'} subtext='Goal to fit'/>
                                <InputForm
                                    respond='signup'
                                    classBtn='continueBtn'
                                    titleForm='Sign Up'
                                    textBtn='Continue'
                                    setIsAgreeTermCheck={setIsAgreeTermCheck}
                                    isAgreeTermCheck={isAgreeTermCheck}

                                    setEmail={setEmail}
                                    setPass={setPass}
                                    isAllChecked={isAllChecked}

                                    action={signupFirst}
                                />
                                <div className='d-flex align-items-center justify-content-center font-detail'>Have an account ? &nbsp;<Link to='/login'>Log In</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer/>
        </>
    );
}
export default SignUpPage;