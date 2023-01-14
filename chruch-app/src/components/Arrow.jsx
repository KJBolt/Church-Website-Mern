import React, {useState} from 'react';
import {AiOutlineArrowUp} from 'react-icons/ai'

function Arrow() {
    const [showButton, setShowButton] = useState(false);


    const checkScrollTop = () => {
        if (!showButton && window.scrollY > 400){
            setShowButton(true);
        } else if (showButton && window.scrollY <= 400){
            setShowButton(false);
        }
    };
    window.addEventListener('scroll', checkScrollTop);

    const scrollTop = () =>{
        window.scrollTo({top:0, behavior:"smooth"})
    };

    return (
        <div className='arrow' onClick={scrollTop} style={{height: 40, display: showButton ? 'flex' : 'none'}}>
            <AiOutlineArrowUp />
        </div>
    );
}

export default Arrow;