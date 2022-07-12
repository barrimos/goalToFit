import React, { useState, useEffect } from 'react';
import './dist/TeamPage.css';
import Reloading from '../../Components/Reloading/Reloading';

function TeamPage(){

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsReady(true);
        }, 1000)
    }, [])


    const backTo = () => {
        window.history.back();
    }

    
    return(
        <>
            {isReady ?
                <div className='teamate my-4'>
                    <div className='container'>
                        <button onClick={() => backTo()} className='backTo'>&times; Back to previous page</button>
                        <h3 style={{'text-align': 'center'}}>Pokkii Group</h3>
                        <div className='row'>
                            <div className='col-12 col-md-4'>
                                <div className='cardTeam'>
                                    <i className='fa-brands fa-github'></i><a href='https://github.com/kongpop1235'>Kongpop Ruschatapaparpong</a>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='cardTeam'>
                                    <i className='fa-brands fa-github'></i><a href='https://github.com/Kayric'>Kirkrapee Techavanich</a>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='cardTeam'>
                                    <i className='fa-brands fa-github'></i><a href='https://github.com/OumChutii'>Chutikan Prasert</a>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='cardTeam'>
                                    <i className='fa-brands fa-github'></i><a href='https://github.com/barrimos'>Prapas Khong-attagarn (me)</a>
                                </div>
                            </div>
                            <div className='col-12 col-md-4'>
                                <div className='cardTeam'>
                                    <i className='fa-brands fa-github'></i><a href='https://github.com/wichapol'>Wichpon Jaimaung</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Reloading/>
            }
        </>
    )
}

export default TeamPage;