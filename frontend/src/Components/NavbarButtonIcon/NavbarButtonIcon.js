import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './NavbarButtonIcon.css';

function NavbarButtonIcon(props){
    return (
        <Link to={`${props.topNav.leftAction}`} id={`nav-btn-${props.topNav.leftClass}`} className={`${props.showNav ? `nav-btn-${props.topNav.leftClass} d-flex` : 'd-none'}`}>
            <i className={`fa fa-${props.topNav.leftIcon}`}></i>
        </Link>
    );
}
export default NavbarButtonIcon;