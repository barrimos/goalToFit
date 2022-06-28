import React from "react";
import './Logo.css';

function Logo(props){
    return(
        <div className="imgLogo">
            <img src={props.srcImg} width="90"/>
            <p className="weight-900">{props.subtext || null}</p>
        </div>
    );
}
export default Logo;