import React, { useEffect } from "react";

function Checkbox_agreeRegis(props){

    useEffect(() => {
        document.getElementById(props.id).checked = false;
    }, [])

    return(
        <input type='checkbox' className={props.class || ''} id={props.id} value={props.value} name={props.name || ''} onClick={e => props.agreeTerm(e)}/>
    )
}

export default Checkbox_agreeRegis;