import React, { useEffect, useState } from 'react';
import './SearchBtn.css';

function SearchBtn(props){
    const [search, setSearch] = useState(props.searchValue);

    const schBtn = document.getElementById('schbtn');
    const magIcon = document.getElementById('magIcon');
    const formInput =  document.getElementById('idinput');

    const clickOpen = () => {
        schBtn.classList.toggle('active');
        if(!schBtn.classList.contains('active')){
            formInput.classList.remove('open');
        }
        if(schBtn.classList.contains('active')){
            formInput.classList.add('open');
        }
    }
    
    useEffect(() => {
        setSearch(props.searchValue);
    }, [props.searchValue])

    useEffect(() => {
        props.setSearch(search);
    }, [search])

    return(
        <div className='searching'>
            <form className='frmsch' name='formdata' autoComplete='off'>
                <input id='idinput' type='text' name='sch' value={search || ''} placeholder='Activity Search' onChange={(e) => setSearch(e.target.value)}/>
            </form>
            <div className='schbtn noSelect' id='schbtn' onClick={clickOpen}>
                <i className='fa fa-magnifying-glass iconsch' id='magIcon'></i>
            </div>
        </div>
    )
}

export default SearchBtn;