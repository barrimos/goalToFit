import React, { useState, useEffect } from "react";
import TopBarInModal from "./TopBarInModal";
import './Modal.css';

function Modal(props){

    const [isModalOpen, setIsModalOpen] = useState(props.stateOpenModal);

    // normal close click button
    useEffect(() => {
        if(isModalOpen){
            openModal();
        } else {
            // if not close from outside close with call inside function Modal Component
            if(!props.stateCloseModal){
                closeModal();
            } else {
                // if close from outside then call outside function that component call
                props.stateCloseModal();
            }
        }
    }, [isModalOpen])

    // When delete or edit an activity
    useEffect(() => {
        if(props.actionManageItem === true){
            sendFunctionCloseModalToParent();
        } else {
            return;
        }
    }, [props.actionManageItem])

    const openModal = () => {
        document.querySelector('.modal').classList.add('active');
        document.body.classList.add('active');
        document.body.style.overflowY = 'hidden';
    }

    const closeModal = async () => {
        document.querySelector('.modal').classList.add('toHide');
        document.body.classList.remove('active');
        document.body.style.overflowY = '';
        await setTimeout(() => {
            document.querySelector('.modal').classList.remove('active');
            document.querySelector('.modal').classList.remove('toHide');
            setIsModalOpen(false);
        }, 200)
    }

    // When action activity finished closeModal
    const sendFunctionCloseModalToParent = () => {
        props.getFunctionCloseWhenAction(closeModal());
    }

    return(
        <div className={`modal ${props.overflowY}`}>
            <TopBarInModal
                header={props.headTitle}
                closeButton={closeModal}
            />
            {props.children}
        </div>
    )
}

export default Modal;