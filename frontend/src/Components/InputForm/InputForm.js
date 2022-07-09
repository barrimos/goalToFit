import React, { useEffect } from 'react';
import Button from '../Button/Button';
import Checkbox_agreeRegis from '../Checkbox_agreeRegis/Checkbox_agreeRegis';
import './InputForm.css';
const { handleEmailPass } = require('../../utils/handleEmailPass');

function InputForm(props){

    useEffect(() => {
        if(document.getElementById('email').value !== ''){
            document.getElementById('email').value = '';
        }
    }, [])

    const validateInput = (e) => {
        if(props.respond === 'login'){
            if(e.target.name === 'email'){
                if(handleEmailPass(e)){
                    props.isFullfill[0] = true;
                    props.UID(e.target.value);
                    props.setIsFullfill([...props.isFullfill]);
                } else {
                    props.isFullfill[0] = false;
                    props.UID(e.target.value);
                    props.setIsFullfill([...props.isFullfill]);
                }
            }
            if(e.target.name === 'password'){
                if(e.target.value.length < 6){
                    props.isFullfill[1] = false;
                    props.UPW(e.target.value);
                    props.setIsFullfill([...props.isFullfill]);
                } else {
                    props.isFullfill[1] = true;
                    props.UPW(e.target.value);
                    props.setIsFullfill([...props.isFullfill]);
                }
            }
        }
        if(props.respond === 'signup'){
            if(e.target.name === 'email'){
                props.setEmail(handleEmailPass(e));
            }
            if(e.target.name === 'password'){
                props.setPass(handleEmailPass(e));
            }
        }
    }

    const agreeTerm = (e) => {
        props.setIsAgreeTermCheck(e.target.attributes['value'].value === 'false' ? true : false);
    }

    return(
        <form className='formEmailPass'>
            <div className='font-head'>{props.titleForm}</div>
            <p className='font-detail weight-300'>{props.titleForm === 'Sign Up'? '' : 'Hi there nice to see you again!'}</p>
            <label className='font-subhead primary-red' htmlFor='email'>
                Email
                <input type='text' id='email' name='email' onChange={e => validateInput(e)} required/>
            </label>
            <label className='font-subhead primary-red' htmlFor='password'>
                Password
                <input type='password' id='password' name='password' onChange={e => validateInput(e)} required/>
            </label>
            {props.respond === 'signup' ?
                <div className='checkTerm d-flex align-items-center'>
                    <Checkbox_agreeRegis id='isCheck' value={props.isAgreeTermCheck || false} agreeTerm={agreeTerm}/>
                    <p className='font-detail weight-500 d-flex justify-content-center align-items-center'>
                        I agree to the &nbsp;
                        <a href='#'>Term &nbsp;</a>
                        and &nbsp;
                        <a href='#'>Privacy Policy</a>
                    </p>
                </div>
                :
                null
            }
            <Button
                classBtn={props.classBtn}
                text={props.textBtn}

                fullfill={props.fullfill}
                isAllChecked={props.isAllChecked}

                action={props.action}
            />
        </form>
    );
}
export default InputForm;