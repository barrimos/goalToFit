import React from "react";
import './ActivityButton.css'

function ActivityButton(props){

    let active = '';
    for(let i in props.select){
        if(Number(props.select[i][3]) === Number(props.id)){
            active = 'active';
        }
    }

    let name = props.name.toLowerCase();
    return(
        props.behavior === 'list' ? 
        <div className={`col-4 allActivities ${props.display}`} id={props.id}>
            <div className={`activityItem ${active}`} id={props.id} pos={props.pos}>
                <img
                    src={`../../../img/${name}.png`}
                    className='activityImage'
                    alt={props.name}
                    data={`${name + '-' + props.type + '-' + props.classifier + '-' + props.id}`}
                    onClick={props.behavior === 'list' ? props.handleIconAddRemove : ''}
                />
                <div className='activityDetails'>
                    <div className='activityName' type={props.type}>{props.name}</div>
                    <div className='type'>{props.type || '-'}</div>
                </div>
            </div>
        </div>
        :
        <div className={`col-4 selectedActivities ${props.showAtTop ? props.showAtTop : ''}`} id={props.id}>
            <div className='activityItem' id={props.id}>
                <img
                    src={`../../../img/${name}.png`}
                    className={`activityImage ${props.setScaleShowTop ? props.setScaleShowTop : ''}`}
                    alt={props.name}
                />
                {props.removeSelectActivities === 'none' ? '' : <i className='fa fa-x removeActivityIcon' data={`${name + '-' + props.type + '-' + props.classifier + '-' + props.id}`} onClick={props.removeSelectActivities}></i>}
                {props.showAtTop ? '' : <div className='activityDetails'>
                    <div className='activityName' type={props.type}>{props.name}</div>
                    <div className='type'>{props.type || '-'}</div>
                </div>}
            </div>
        </div>
    )
}

export default ActivityButton;