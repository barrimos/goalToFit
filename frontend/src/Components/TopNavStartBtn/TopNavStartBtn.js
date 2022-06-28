import React, { useState, useEffect } from 'react';
import './TopNavStartBtn.css';
import MockupBtn from '../MockupBtn/MockupBtn';
import StartBtn from '../StartBtn/StartBtn';
import SearchBtn from '../SearchBtn/SearchBtn';

function TopNavStartBtn(props){

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(props.isReady);
    })

    return(
        <div className='TopNavStartBtn' id='TopNavStartBtn'>
            <div className='container'>
                <div className='row no-gutters d-flex justify-content-center justify-content-lg-between align-items-center'>
                    <div className='col-10 col-sm-6 col-md-5 col-lg-3'>
                        <MockupBtn clearHeight={'clearHeight'} clearPadding={'clearPadding'} setWH={'setWH'}/>
                        <div className='row no-gutters'>
                            {props.children}
                        </div>
                    </div>
                    <div className='d-none d-md-block col-md-4 inTopNav col-lg-3'>
                        <StartBtn showOnTop={'d-block'} widthAtTop={'widthAtTop'} heightAtTop={'heightAtTop'} inTopNav={'inTopNav'} isReady={ready} pressStart={props.pressStart}/>
                    </div>
                    <div className='col-2 col-sm-6 col-md-3'>
                        <SearchBtn searchValue={props.searchValue} setSearch={props.setSearch}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavStartBtn;