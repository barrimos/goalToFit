import React from "react";

function ButtonInModal(props){

    const deleteThis = async () => {
        props.deleteFunc(props.activityId, true);
    }

    const updateThis = async () => {
        props.editFunc(props.activityId, props.newData, true);
    }

    return(
        <div className='modalButton'>
            {props.classButtonType === 'delete' ?
                <button className={`modalButton-delete`} name='delete' onClick={deleteThis}>DELETE</button>
                :
                <button className={`modalButton-edit`} name='edit' onClick={updateThis}>SAVE</button>
            }
        </div>
    )
}

export default ButtonInModal;