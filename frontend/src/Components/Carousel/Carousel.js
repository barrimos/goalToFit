import React, { useState, useEffect } from 'react';
import './Carousel.css';
import axios from 'axios';
import config from '../../config';

function Carousel(props){

    const [selectedPack, setSelectedPack] = useState([]);
    const [activitiesPack, setActivitiesPack] = useState([]);
    const [numPack, setNumPack] = useState();

    const [curSlideIndex, setCurSlideIndex] = useState(0);
    const [isEnabled, setIsEnabled] = useState(true);

    const [items, setItems] = useState();
    const [dots, setDots] = useState();

    useEffect(() => {
        ( async () => {
            await axios.get(`${config.local}/create/packset`)
            .then(res => {
                setActivitiesPack(res.data);
            })
            .catch(err => console.error('Error: ' + err))
        })()
    }, []);
    
    const selectPack = (e) => {
        setNumPack(e.target.value.split('-')[1]);
        if(e.target.checked === true){
            if(selectedPack.length === 1 || props.amountActivities > 0){
                e.target.checked = false;
                alert('Limit 3 activities');
                return;
            } else {
                props.count(3)
                setSelectedPack([...selectedPack, e.target.parentNode.innerText.split(':')[1].trim().toLowerCase()]);
                e.target.parentNode.parentNode.prepend(document.createElement('i'));
                e.target.parentNode.parentNode.children[0].setAttribute('class', 'fas fa-check selectedThisPackSet');
                e.target.setAttribute('checked', '');
            }
        } else {
            props.count(0)
            let unSelect = selectedPack.filter(item => item !== e.target.parentNode.innerText.split(':')[1].trim().toLowerCase());
            setSelectedPack(unSelect);
            e.target.parentNode.parentNode.children[0].remove();
        }
    }

    const handlePackSelect = () => {
        if(selectedPack.length === 1){
            props.selectFromCarousel(activitiesPack[numPack][selectedPack], true);
        }
        if(selectedPack.length === 0){
            props.selectFromCarousel(selectedPack, false);
        }
    }

    useEffect(() => {
        handlePackSelect();
        return () => {
            handlePackSelect();
        }
    }, [selectedPack])

    useEffect(async () => {
        await setItems(document.querySelectorAll('.carousel .item'));
        await setDots(document.querySelectorAll('.carousel-indicators li'));
    }, [activitiesPack])
    let currentItem = curSlideIndex;
    
    const changeCurrentItem = (n) => {
        currentItem = (n + items.length) % items.length;
        setCurSlideIndex(currentItem);
    }
    
    const nextItem = (n) => {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }
    
    const previousItem = (n) => {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    }
    
    const goToItem = (n) => {
        if(n < currentItem) {
            hideItem('to-right');
            currentItem = n;
            setCurSlideIndex(n);
            showItem('from-left');
        } else {
            hideItem('to-left');
            currentItem = n;
            setCurSlideIndex(n);
            showItem('from-right');
        }
    }
    
    const hideItem = (direction) => {
        setIsEnabled(false);
        items[currentItem].classList.add(direction);
        dots[currentItem].classList.remove('active');
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('active', direction);
        });
    }
    
    const showItem = (direction) => {
        items[currentItem].classList.add('next', direction);
        dots[currentItem].classList.add('active');
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('next', direction);
            this.classList.add('active');
            setIsEnabled(true);
        });
    }


    const prev = () => {
        if(isEnabled) {
            previousItem(currentItem);
        }
    }

    const next = () => {
        if(isEnabled) {
            nextItem(currentItem);
        }
    }

    const indiClick = (e) => {
        const target = [].slice.call(e.target.parentNode.children).indexOf(e.target);
        if(target !== currentItem && target < dots.length) {
            goToItem(target);
        } 
    }

    return(
        <div className='carousel' id='carouselSlide'>
            <div className='carousel-inner'>
                {activitiesPack && activitiesPack.map((pack, i) => (
                    <div className={`${i === 0 ? 'item active d-lg-block' : 'item d-lg-block'}`} key={i}>
                        <div className='containers'>
                            <div className='packSet'>
                                <div className='packageName'>{`LEVEL : ${Object.keys(pack)[1]}`.toUpperCase()}
                                    <input type='checkbox' onClick={selectPack} value={`packSet-${i}`} className='checkPackSet'/>
                                </div>
                                <div className='row d-flex justify-content-center'>
                                    <img src={`../../../img/${pack[Object.keys(pack)[1]][0].split('-')[0]}.png`} className='activityImage' alt={`${pack[Object.keys(pack)[1]][0].split('-')[0]}`}/>
                                    <img src={`../../../img/${pack[Object.keys(pack)[1]][1].split('-')[0]}.png`} className='activityImage' alt={`${pack[Object.keys(pack)[1]][1].split('-')[0]}`}/>
                                    <img src={`../../../img/${pack[Object.keys(pack)[1]][2].split('-')[0]}.png`} className='activityImage' alt={`${pack[Object.keys(pack)[1]][2].split('-')[0]}`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='d-lg-none'>
                <div className='carousel-control left' onClick={prev}>
                    <div className='arrow left'></div>
                </div>
                <div className='carousel-control right' onClick={next}>
                    <div className='arrow right'></div>
                </div>
                <ol className='carousel-indicators' onClick={(e) => indiClick(e)}>
                    <li className='active'></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        </div>
    )
}

export default Carousel;