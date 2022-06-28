import React from "react";
import './dist/TeamPage.css';

function TeamPage(){
    return(
        <div className='teamate'>
            <div className='container'>
                <div className='row'>
                    <div className='col-auto'>
                        <h3>Developer Team</h3>
                        <p style={{display: 'inline-flex'}}>Prapas Khong-attagarn -&nbsp;<a href='#'>Git Repository</a><a href='prapas.k13@hotmail.com'>prapas.k13@hotmail.com</a></p>
                        <p style={{display: 'inline-flex'}}>Kirkrapee Techavanich -&nbsp;<a href='#'>Git Repository</a><a href='kirkrapee@gmail.com'>kirkrapee@gmail.com</a></p>
                        <p style={{display: 'inline-flex'}}>Chutikan Prasert -&nbsp;<a href='#'>Git Repository</a><a href='chutikan.prasert@gmail.com'>chutikan.prasert@gmail.com</a></p>
                        <p style={{display: 'inline-flex'}}>Wichpon Jaimaung -&nbsp;<a href='#'>Git Repository</a><a href='wichapol.44424@gmail.com'>wichapol.44424@gmail.com</a></p>
                        <p style={{display: 'inline-flex'}}>Kongpop Ruschatapaparpong -&nbsp;<a href='#'>Git Repository</a><a href='ru.kongpop@hotmail.com'>ru.kongpop@hotmail.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamPage;