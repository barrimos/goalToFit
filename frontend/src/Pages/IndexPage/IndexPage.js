import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './dist/IndexPage.css';
import Wrapper from '../../Components/Wrapper/Wrapper';

function IndexPage(){

    useEffect(() => {
        const childSection = document.getElementsByTagName('section')[0].id;
        const tagBody = document.getElementsByTagName('body')[0];
        if(childSection === 'indexPage'){
            tagBody.classList.add('addBg');
        } else {
            tagBody.classList.remove('addBg');
        }
        return () => {
            tagBody.classList.remove('addBg');
        }
    })

    return(
        <>
            <Wrapper hasMenu={false}>
            <section id='indexPage'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-5 col-lg-4'>
                            <div className='gtf-title'>
                                <h1>GOAL<br/>TO<br/>FIT</h1>
                                <img src='../../img/gtf-logo.png' alt='goal to fit'/>
                                <Link to='/report' className='startBtn weight-500'>START</Link>
                            </div>
                        </div>
                        <div className='col-12 col-md-7 col-lg-8'>
                            <div className='bannerImg'>
                                <img className='imgExc' src='./img/indoor-4.jpg' alt='Indoor' role='banner'/>
                                <img className='imgExc' src='./img/outdoor-2.jpg' alt='Outdoor' role='banner'/>
                                <img className='imgExc' src='./img/yoka-5.jpg' alt='Yoka' role='banner'/>
                                <img className='imgExc' src='./img/weight-3.jpg' alt='Weight' role='banner'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </Wrapper>
        </>
    )
}
export default IndexPage;