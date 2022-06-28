import React from "react";
import './SwitchGenderButton.css';

function SwitchGenderButton(props){

    const selectGender = (value) => {
        let inpGender = document.querySelector(`input[value=${value}]`).value;
        let labelGender = Array.from(document.querySelectorAll('label[gender]'));
        
        labelGender.map(label => {
            if(label.attributes[2].value === inpGender){
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        })
        props.setGender(inpGender);
    }


    return(
        <>
            <label className='label-gender'>Gender</label>
            <div className='switch-gender-btn mx-auto'>
                {props.gender.map((gen, i) => (
                    <div className='groupButton' key={i}>
                        <label className={`label-switch-${gen.toLowerCase()}`} htmlFor={`checkbox-${gen.toLowerCase()}`} gender={`${gen.toLowerCase()}`} onClick={() => selectGender(`${gen.toLowerCase()}`)}>{gen}</label>
                        <input type='radio' name='gender' id={`checkbox-${gen.toLowerCase()}`} className={`checkbox-${gen.toLowerCase()}`} value={`${gen.toLowerCase()}`} required/>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SwitchGenderButton;