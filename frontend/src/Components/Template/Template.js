import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Template.css';

export function Navbar(props){

    const [btnClass, setBtnClass] = useState('');
    const handleClassBtn = () => {
        if(props.allReady){
            setBtnClass('noneactive');
        } else {
            setTimeout(() => {
                setBtnClass('');
            }, 1000)
        }
    }
    useEffect(() => {
        handleClassBtn();
    }, [props.allReady])

    return(
        <div className='topnav' nav={`${props.showNav}`}>
            <nav className='container'>
                <div className='row justify-content-between align-items-center'>
                    <div className='col-12 d-flex d-md-none top-btn-create'>
                        {/* <!-- Left Button --> */}
                        <Link to={props.topNav.leftAction} id={`nav-btn-${props.topNav.leftClass}`} className={`${props.showNav ? 'nav-btn-' + props.topNav.leftClass +  ' d-flex' : 'd-none'}`}>
                            <i className={`fa fa-${props.topNav.leftIcon}`}></i>
                        </Link>
                        {/* <!-- Right Button --> */}
                        <Link to={props.topNav.rightAction} onClick={props.topNav.rightStartWorkout} id={`nav-btn-${props.topNav.rightClass}`} className={`${props.showNav ? 'nav-btn-' + props.topNav.rightClass + ' d-flex' : 'd-none'}`}>
                            <i className={`fa fa-${props.topNav.rightIcon}`}></i>
                        </Link>
                    </div>
                    {/* <!-- Bottom Nav Icon --> */}
                    <div className='col-12 d-block d-md-none'>
                        <ul className='menu-icon-bottom d-flex'>
                            <li className='menu-icon'>
                                <Link to='/report'>
                                    <i className='fa fa-home'></i>
                                </Link>
                            </li>
                            <li className='menu-icon'>
                                <Link to='/create'>
                                    <i className='fa fa-plus-circle'></i>
                                </Link>
                            </li>
                            {props.readyButton ?
                                <li className={`menu-icon readyBtn ${props.allReady ? 'actives' : btnClass}`}>
                                    <Link to='/start' onClick={props.topNav.rightStartWorkout}>
                                        <i className='fa fa-running'></i>
                                    </Link>
                                </li>
                                :
                                null
                            }
                            <li className='menu-icon'>
                                <Link to='/start'>
                                    <i className='fa fa-play'></i>
                                </Link>
                            </li>
                            <li className='menu-icon'>
                                <Link to='/profile'>
                                    <i className='fa fa-user'></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- Top Nav Menu --> */}
                    <div className='col-12 col-md-5 d-flex align-items-center'>
                        <img src={props.srcImg} alt='Logo Goal to fit' className='logo-title d-none d-md-block'/>
                        <h2 className='nav-title primary-text-color'>{props.titleHead}</h2>
                    </div>
                    <div className='col-md-7 d-none d-md-block'>
                        <ul className='nav-item d-none d-md-flex'>
                            <li className='nav-list'>
                                <Link to='/report' className='d-flex'>
                                    <i className='fa fa-home mr-1'></i>
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className='nav-list'>
                                <Link to='/create' className='d-flex'>
                                    <i className='fa fa-plus-circle mr-1'></i>
                                    <p>Create</p>
                                </Link>
                            </li>
                            <li className='nav-list'>
                                <Link to='/start' className='d-flex'>
                                    <i className='fa fa-play mr-1'></i>
                                    <p>Workout</p>
                                </Link>
                            </li>
                            <li className='nav-list'>
                                <Link to='/profile' className='d-flex'>
                                    <i className='fa fa-user mr-1'></i>
                                    <p>Profile</p>
                                </Link>
                            </li>
                            <li className='nav-list ml-md-4 ml-lg-5'>
                                <Link to='/' className='d-flex primary-red'>
                                    <i className='fa fa-power-off mr-1'></i>
                                    <p>Logout</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- Top Nav Menu --> */}
                </div>
            </nav>
        </div>
    );
}


export function Footer(){
    return(
        <footer className='mt-0 mt-md-4'>
            <div className='container'>
                <p className='font-subhead'>Copyright &copy; 2022 :&nbsp;<Link to='/team'>Pokkii Team</Link></p>
            </div>
        </footer>
    );
}


function Template(props){
    return(
        <>
            <div className='wrapper' id={props.pageId}>
                <Navbar
                    readyButton={props.readyButton}
                    srcImg={'../../img/gtf-logo.png'}
                    titleHead={props.titleHead}
                    showNav={props.showNav}
                    allReady={props.ready}
                    topNav={{
                        leftIcon: props.showNav ? props.topNav.leftBtn.FAicon : '',
                        leftClass: props.showNav ? props.topNav.leftBtn.class : '',
                        leftAction: props.showNav ? props.topNav.leftBtn.linkto : '',
                        rightIcon: props.showNav ? props.topNav.rightBtn.FAicon : '',
                        rightClass: props.showNav ? props.topNav.rightBtn.class : '',
                        rightAction: props.showNav ? props.topNav.rightBtn.linkto : '',
                        rightStartWorkout: props.showNav ? props.startWorkout : '',
                    }}
                />
                <hr className='d-none d-md-block mt-0 mb-0 mb-md-4'/>
                {props.children}
                <div className='push'></div>
            </div>
            <Footer/>
        </>
    );
}
export default Template;