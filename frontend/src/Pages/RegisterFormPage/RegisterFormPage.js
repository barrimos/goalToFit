import React from 'react';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { Footer } from '../../Components/Template/Template';
import PersonalForm from '../../Components/PersonalForm/PersonalForm';

function RegisterFormPage(){
    return(
        <>
            <Wrapper hasMenu={false}>
                <PersonalForm />
            </Wrapper>
            <Footer/>
        </>
    );
}
export default RegisterFormPage;