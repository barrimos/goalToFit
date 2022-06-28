import React from 'react';
import { Link } from 'react-router-dom';
import './dist/ResetPassPage.css';

function ResetPassPage(){

    const emailPattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const regExEmail = (e) => {
        let RegexEmail = emailPattern.test(e.target.value);
        if(RegexEmail === false){
            document.querySelector('.submitReset').setAttribute('disabled', '');
            return;
        } else {
            document.querySelector('.submitReset').removeAttribute('disabled');
        }
    }

    return(
        <div className='resetPassForm' id='resetPassForm'>
            <Link to='/login' className='cancelReset'><i className='fa fa-x'></i></Link>
            <div className='container'>
                <div className='row justify-content-center align-items-center'>
                    <div className='col-auto'>
                        <h3 className='resetPassTitle'>Reset your password</h3>
                        <form method='POST' name='form' className='formReset'>
                            <input name='email' type='text' id='email' placeholder='Your email' onChange={regExEmail} required/>
                            <p>Your new password will send to your email</p>
                            <button className='submitReset' type='submit' disabled>Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResetPassPage;