import React from 'react';
import './ToTopBtn.css';

function ToTopBtn(){

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return(
        <button className='toTopBtn' onClick={topFunction} id='toTopBtn'>
            <svg viewBox='0 0 35 35' aria-hidden='true' alt='backTop'>
                <path
                    d = 'M10 22 L 18 13 L 25 22'
                    fill = 'none'
                    stroke = '#666'
                    strokeWidth = '3'
                />
            </svg>
        </button>
    )
}

export default ToTopBtn;