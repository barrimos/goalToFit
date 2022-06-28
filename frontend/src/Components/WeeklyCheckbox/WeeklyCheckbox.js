import React, { useEffect, useState } from "react";
import './WeeklyCheckbox.css';

function WeeklyCheckbox(props){

    const [isDays, setIsDays] = useState([]);
    const weekly = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        props.setDays(isDays);
        // console.log('isDays', isDays);
    }, [isDays])


    const handleDay = (e) => {
        const inpWeek = document.querySelector(`input[value=${e.target.value}]`).value;
        const labelWeek = Array.from(document.querySelectorAll('label[week]'));
        if(e.target.checked){
            setIsDays([...isDays, e.target.value]);
            labelWeek.filter(day => day.attributes[2].value === inpWeek)[0].classList.add('active');
        } else {
            let indexDay = isDays.indexOf(e.target.value);
            isDays.splice(indexDay, 1)
            setIsDays([...isDays]);
            labelWeek.filter(day => day.attributes[2].value === inpWeek)[0].classList.remove('active');
        }
    }



    return(
        <div className='weekly'>
            {weekly.map((day, i) => (
                <div className='dayCheckButton' key={i}>
                    <input type='checkbox' id={`${day.toLowerCase()}`} className={`inputDay ${day.toLowerCase()}`} value={`${day.toLowerCase()}`} name='day' onClick={e => handleDay(e)}/>
                    <label className={`label-day-${day.toLowerCase()}`} htmlFor={`${day.toLowerCase()}`} week={`${weekly[i]}`.toLowerCase()}>{day.slice(0,3)}</label>
                </div>
            ))}
        </div>
    )
}
export default WeeklyCheckbox;