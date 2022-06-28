import React from "react";

function Wrapper(props){
    return(
        <div className={props.hasMenu === false? "wrapper-no-menu" : "wrapper"}>
            { props.children }
            <div className="push"></div>
        </div>
    );
}
export default Wrapper